import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Profile } from './components/profile/profile';
import { Friends } from './components/friends/friends';
import { Notifications } from './components/notifications/notifications';
import { Footer } from './components/footer/footer';
import { ConferenceDetail } from './components/conference-detail/conference-detail';
import { ConferenceList } from './components/conference-list/conference-list';
import { Conference } from './models/conference.model';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Navbar,
    Profile,
    Friends,
    Notifications,
    Footer,
    ConferenceDetail,
    ConferenceList,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  selectedConference?: Conference;

  onConferenceSelected(conference: Conference) {
    this.selectedConference = conference;
  }
}
