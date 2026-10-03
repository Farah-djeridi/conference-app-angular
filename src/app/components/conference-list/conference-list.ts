import { Component ,EventEmitter, Output} from '@angular/core';
import { UpperCasePipe, DatePipe } from '@angular/common';

interface Conference {
  title: string;
  description: string;
  date: string;
  place: string;
  maxParticipants: number;
  nbParticipants: number;
}



@Component({
  selector: 'app-conference-list',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css'
})
export class ConferenceList {

  conferences: Conference[] = [
    {
      title: 'Angular 21',
      description: 'Découvrir Angular 21',
      date: '2026-10-10',
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 70
    },
    {
      title: 'Développement Web',
      description: 'Les nouvelles technologies web',
      date: '2026-10-15',
      place: 'Sousse',
      maxParticipants: 50,
      nbParticipants: 45
    }
  ];


  selectConference(conference: Conference) {
    this.conferenceSelected.emit(conference);
  }
  
  isUpcoming(date: string): boolean {
    return new Date(date) >= new Date();
  }

  @Output()
conferenceSelected = new EventEmitter<Conference>();

}