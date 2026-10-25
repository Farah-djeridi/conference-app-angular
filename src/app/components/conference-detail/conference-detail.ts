import { Component, signal, Input } from '@angular/core';
import { Conference } from '../../models/conference.model';

@Component({
  selector: 'app-conference-detail',
  imports: [],
  templateUrl: './conference-detail.html',
  styleUrl: './conference-detail.css',
})
export class ConferenceDetail {
  title = signal('Angular 21');
  speaker = signal('John Smith');
  date = signal('10/10/2026');
  availablePlaces = signal(25);

  inscrire() {
    console.log('Inscription effectuée');
  }

  @Input()
  conference?: Conference;
}
