import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Profile } from './components/profile/profile';
import { Friends } from './components/friends/friends';
import { Notifications } from './components/notifications/notifications';
import { Footer } from './components/footer/footer';
import { ConferenceDetail } from './components/conference-detail/conference-detail';
import { ConferenceList } from './components/conference-list/conference-list';


interface Conference {
  title: string;
  description: string;
  date: string;
  place: string;
  maxParticipants: number;
  nbParticipants: number;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Navbar,
    Profile,
    Friends,
    Notifications,
    Footer,
    ConferenceDetail,
    ConferenceList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  selectedConference?: Conference;

  onConferenceSelected(conference: Conference) {
    this.selectedConference = conference;
  }
}