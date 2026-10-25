import { Component, inject } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  template: `
    <div class="admin-dashboard">
      <h4>Tableau de bord de gestion</h4>
      <div class="stats-cards">
        <div class="stat-card">
          <span class="stat-val">{{ conferenceService.conferences().length }}</span>
          <span class="stat-lbl">Conférences au catalogue</span>
        </div>
        <div class="stat-card">
          <span class="stat-val">{{ bookingService.bookedCount() }}</span>
          <span class="stat-lbl">Réservations actives</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    h4 { margin-top: 0; color: #1e293b; }
    .stats-cards { display: flex; gap: 1rem; margin-top: 1rem; }
    .stat-card {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      text-align: center;
      min-width: 140px;
    }
    .stat-val { display: block; font-size: 1.8rem; font-weight: bold; color: #2563eb; }
    .stat-lbl { color: #64748b; font-size: 0.85rem; }
  `]
})
export class AdminDashboardComponent {
  readonly conferenceService = inject(ConferenceService);
  readonly bookingService = inject(BookingService);
}
