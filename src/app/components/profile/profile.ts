import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Friends } from '../friends/friends';
import { Notifications } from '../notifications/notifications';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-profile',
  imports: [Friends, Notifications, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  readonly bookingService = inject(BookingService);
}
