import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../../services/conference.service';

@Component({
  selector: 'app-confirmation',
  imports: [RouterLink],
  template: `
    <div class="confirmation-box">
      <div class="icon">🎉</div>
      <h2>Inscription validée avec succès !</h2>
      @if (conference(); as conf) {
        <p class="conf-info">
          Vous êtes officiellement inscrit(e) à la conférence :
          <br />
          <strong>{{ conf.title }}</strong> à <em>{{ conf.place }}</em> (le {{ conf.date }}).
        </p>
      } @else {
        <p>Votre place a été réservée avec succès dans votre programme personnel.</p>
      }

      <div class="actions">
        <a routerLink="/conferences" class="btn-primary">Retour aux conférences</a>
        <a routerLink="/profile" class="btn-secondary">Voir mon profil</a>
      </div>
    </div>
  `,
  styles: [`
    .confirmation-box {
      max-width: 550px;
      margin: 2rem auto;
      text-align: center;
      padding: 2.5rem;
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 12px;
    }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    h2 { color: #166534; margin-bottom: 1rem; }
    .conf-info { color: #15803d; font-size: 1.1rem; line-height: 1.6; }
    .actions { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }
    .btn-primary {
      background-color: #16a34a;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }
    .btn-secondary {
      background-color: white;
      color: #166534;
      border: 1px solid #bbf7d0;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class Confirmation {
  private readonly conferenceService = inject(ConferenceService);

  /** Récupéré directement des queryParams via withComponentInputBinding() */
  readonly conferenceId = input<string>();

  readonly conference = computed(() => {
    const id = this.conferenceId();
    return id ? this.conferenceService.getConferenceById(id) : undefined;
  });
}
