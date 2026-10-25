import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <h3>Espace Administrateur</h3>
        <nav>
          <a routerLink="dashboard" routerLinkActive="active">Tableau de bord</a>
          <a routerLink="stats" routerLinkActive="active">Statistiques</a>
        </nav>
      </aside>
      <section class="admin-content">
        <router-outlet></router-outlet>
      </section>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      gap: 1.5rem;
      margin: 1.5rem 0;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .admin-sidebar {
      width: 220px;
      border-right: 1px solid #e2e8f0;
      padding-right: 1rem;
    }
    .admin-sidebar h3 { margin-top: 0; color: #1e293b; font-size: 1.1rem; }
    .admin-sidebar nav a {
      display: block;
      padding: 0.5rem 0.75rem;
      color: #475569;
      text-decoration: none;
      border-radius: 6px;
      margin-bottom: 0.25rem;
    }
    .admin-sidebar nav a.active {
      background-color: #e0f2fe;
      color: #0369a1;
      font-weight: 600;
    }
    .admin-content { flex: 1; padding: 0.5rem; }
  `]
})
export class AdminComponent {}
