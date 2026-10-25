import { Injectable, inject, signal, computed } from '@angular/core';
import { Conference } from '../models/conference.model';
import { ConferenceService } from './conference.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly conferenceService = inject(ConferenceService);

  private readonly bookedConferencesSignal = signal<Conference[]>([]);

  /** Signal en lecture seule des conférences réservées par l'utilisateur */
  readonly bookedConferences = this.bookedConferencesSignal.asReadonly();

  /** Signal dérivé (computed) contenant le nombre total de réservations */
  readonly bookedCount = computed(() => this.bookedConferencesSignal().length);

  /**
   * Vérifie si une conférence est déjà réservée
   */
  isBooked(conferenceTitle: string): boolean {
    return this.bookedConferencesSignal().some((c) => c.title === conferenceTitle);
  }

  /**
   * Réserve une place pour une conférence donnée
   */
  bookConference(conference: Conference): boolean {
    if (this.isBooked(conference.title)) {
      return false;
    }

    const reserved = this.conferenceService.reserveSeat(conference.title);
    if (reserved) {
      this.bookedConferencesSignal.update((bookings) => [...bookings, conference]);
      return true;
    }

    return false;
  }

  /**
   * Annule une réservation existante
   */
  cancelBooking(conferenceTitle: string): void {
    if (!this.isBooked(conferenceTitle)) {
      return;
    }

    this.conferenceService.releaseSeat(conferenceTitle);
    this.bookedConferencesSignal.update((bookings) =>
      bookings.filter((c) => c.title !== conferenceTitle)
    );
  }
}
