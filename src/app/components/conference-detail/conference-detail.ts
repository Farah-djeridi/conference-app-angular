import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ConferenceService } from '../../services/conference.service';
import { BookingService } from '../../services/booking.service';
import { Conference } from '../../models/conference.model';

@Component({
  selector: 'app-conference-detail',
  imports: [RouterLink, DatePipe, UpperCasePipe],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
})
export class ConferenceDetail {
  private readonly conferenceService = inject(ConferenceService);
  readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  /**
   * En Angular 21 avec withComponentInputBinding(),
   * le paramètre de route :id est injecté directement dans ce signal input()
   * SANS subscribe() ni fuite mémoire !
   */
  readonly id = input<string>();

  /**
   * Possibilité également de passer directement une conférence par input
   */
  readonly conferenceInput = input<Conference | undefined>(undefined, { alias: 'conference' });

  /** Signal calculé réactif récupérant la conférence */
  readonly currentConference = computed(() => {
    const directInput = this.conferenceInput();
    if (directInput) return directInput;

    const routeId = this.id();
    if (routeId) {
      return this.conferenceService.getConferenceById(routeId);
    }
    return undefined;
  });

  book(): void {
    const conf = this.currentConference();
    if (!conf) return;

    const success = this.bookingService.bookConference(conf);
    if (success) {
      // Navigation programmée vers la page de confirmation
      this.router.navigate(['/confirmation'], {
        queryParams: { conferenceId: conf.id },
      });
    }
  }

  cancel(): void {
    const conf = this.currentConference();
    if (conf) {
      this.bookingService.cancelBooking(conf.title);
    }
  }
}
