import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UpperCasePipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Conference } from '../../models/conference.model';
import { ConferenceService } from '../../services/conference.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-conference-list',
  imports: [UpperCasePipe, DatePipe, RouterLink],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  readonly conferenceService = inject(ConferenceService);
  readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  @Output()
  conferenceSelected = new EventEmitter<Conference>();

  selectConference(conference: Conference): void {
    this.conferenceSelected.emit(conference);
  }

  isUpcoming(date: string): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  }

  book(conference: Conference, event?: Event): void {
    event?.stopPropagation();
    const success = this.bookingService.bookConference(conference);
    if (success) {
      // Navigation programmée automatique vers la confirmation
      this.router.navigate(['/confirmation'], {
        queryParams: { conferenceId: conference.id },
      });
    }
  }

  cancel(conferenceTitle: string, event?: Event): void {
    event?.stopPropagation();
    this.bookingService.cancelBooking(conferenceTitle);
  }
}
