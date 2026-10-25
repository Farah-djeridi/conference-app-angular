import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home-hero">
      <h2>Bienvenue sur ConfTech</h2>
      <p>La plateforme de référence pour les conférences technologiques internationales.</p>
      <div class="hero-actions">
        <a routerLink="/conferences" class="btn-primary">Explorer les conférences</a>
        <a routerLink="/profile" class="btn-secondary">Mon profil</a>
      </div>
    </div>
  `,
  styles: [`
    .home-hero {
      text-align: center;
      padding: 3rem 1.5rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border-radius: 12px;
      margin: 1.5rem 0;
    }
    h2 { font-size: 2rem; color: #0f172a; margin-bottom: 0.5rem; }
    p { font-size: 1.15rem; color: #475569; margin-bottom: 2rem; }
    .hero-actions { display: flex; justify-content: center; gap: 1rem; }
    .btn-primary {
      background-color: #2563eb;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
    .btn-secondary {
      background-color: white;
      color: #1e293b;
      padding: 0.75rem 1.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class Home {}
