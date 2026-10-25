import { Component, inject } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly bookingService = inject(BookingService);
}
