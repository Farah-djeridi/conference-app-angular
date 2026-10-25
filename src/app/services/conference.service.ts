import { Injectable, signal, computed } from '@angular/core';
import { Conference } from '../models/conference.model';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  private readonly conferencesSignal = signal<Conference[]>([
    {
      title: 'Angular 21',
      description: 'Découvrir Angular 21 et les Signals réactifs',
      date: '2026-11-10',
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 70,
    },
    {
      title: 'Développement Web Moderne',
      description: 'Les nouvelles technologies web et le SSR',
      date: '2026-11-15',
      place: 'Sousse',
      maxParticipants: 50,
      nbParticipants: 45,
    },
    {
      title: 'Architecture Micro-Frontend',
      description: 'Modularité et scalabilité des grandes applications',
      date: '2026-12-01',
      place: 'Sfax',
      maxParticipants: 30,
      nbParticipants: 30,
    },
  ]);

  /** Signal en lecture seule pour accéder au catalogue complet */
  readonly conferences = this.conferencesSignal.asReadonly();

  /** Signal calculé listant uniquement les conférences à venir */
  readonly upcomingConferences = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.conferencesSignal().filter((c) => new Date(c.date) >= today);
  });

  /**
   * Réserve une place dans le catalogue en incrémentant nbParticipants
   */
  reserveSeat(conferenceTitle: string): boolean {
    let success = false;
    this.conferencesSignal.update((conferences) =>
      conferences.map((conf) => {
        if (conf.title === conferenceTitle && conf.nbParticipants < conf.maxParticipants) {
          success = true;
          return { ...conf, nbParticipants: conf.nbParticipants + 1 };
        }
        return conf;
      })
    );
    return success;
  }

  /**
   * Libère une place dans le catalogue en décrémentant nbParticipants
   */
  releaseSeat(conferenceTitle: string): void {
    this.conferencesSignal.update((conferences) =>
      conferences.map((conf) => {
        if (conf.title === conferenceTitle && conf.nbParticipants > 0) {
          return { ...conf, nbParticipants: conf.nbParticipants - 1 };
        }
        return conf;
      })
    );
  }
}
