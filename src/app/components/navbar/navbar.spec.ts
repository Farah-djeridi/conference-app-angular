import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';
import { BookingService } from '../../services/booking.service';
import { Conference } from '../../models/conference.model';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let bookingService: BookingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    bookingService = TestBed.inject(BookingService);
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect bookedCount from BookingService', async () => {
    const mockConf: Conference = {
      id: 'conf-1',
      title: 'Angular 21',
      description: 'Desc',
      date: '2026-11-10',
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 70,
    };

    expect(component.bookingService.bookedCount()).toBe(0);

    bookingService.bookConference(mockConf);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.bookingService.bookedCount()).toBe(1);
    expect(compiled.textContent).toContain('1');
  });
});
