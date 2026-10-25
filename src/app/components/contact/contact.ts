import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  template: `
    <div class="contact-card">
      <h2>Contactez l'équipe ConfTech</h2>
      <p>Une question concernant vos inscriptions ou l'organisation ?</p>
      <ul>
        <li><strong>Email :</strong> contact&#64;conftech.org</li>
        <li><strong>Téléphone :</strong> +216 71 000 000</li>
        <li><strong>Adresse :</strong> Pôle Technologique El Ghazela, Tunis</li>
      </ul>
    </div>
  `,
  styles: [`
    .contact-card {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    h2 { color: #1e293b; margin-top: 0; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.75rem 0; color: #475569; }
  `]
})
export class Contact {}
