import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-stats',
  imports: [],
  template: `
    <div class="admin-stats">
      <h4>Statistiques de fréquentation</h4>
      <p>Taux de remplissage moyen : <strong>85%</strong></p>
      <p>Catégorie la plus populaire : <strong>Web & Cloud</strong></p>
    </div>
  `,
  styles: [`
    h4 { margin-top: 0; color: #1e293b; }
    p { color: #475569; }
  `]
})
export class AdminStatsComponent {}
