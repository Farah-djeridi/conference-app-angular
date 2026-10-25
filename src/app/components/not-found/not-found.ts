import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found-box">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>L'URL que vous recherchez n'existe pas ou a été déplacée.</p>
      <a routerLink="/conferences" class="btn-home">Retour aux conférences</a>
    </div>
  `,
  styles: [`
    .not-found-box {
      text-align: center;
      padding: 4rem 1rem;
    }
    h1 { font-size: 5rem; color: #ef4444; margin: 0; }
    h2 { color: #1e293b; margin: 0.5rem 0 1rem; }
    p { color: #64748b; margin-bottom: 2rem; }
    .btn-home {
      background-color: #2563eb;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class NotFound {}
