import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { ConferenceService } from './conference.service';
import { Conference } from '../models/conference.model';

describe('BookingService', () => {
  let bookingService: BookingService;
  let conferenceService: ConferenceService;

  const mockConference: Conference = {
    id: 'conf-1',
    title: 'Angular 21',
    description: 'Test conference',
    date: '2026-11-10',
    place: 'Tunis',
    maxParticipants: 100,
    nbParticipants: 50,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    bookingService = TestBed.inject(BookingService);
    conferenceService = TestBed.inject(ConferenceService);
  });

  it('should be created', () => {
    expect(bookingService).toBeTruthy();
  });

  it('should book a conference and update bookedCount reactively', () => {
    expect(bookingService.bookedCount()).toBe(0);

    const success = bookingService.bookConference(mockConference);
    expect(success).toBe(true);
    expect(bookingService.bookedCount()).toBe(1);
    expect(bookingService.isBooked(mockConference.title)).toBe(true);
  });

  it('should not allow booking the same conference twice', () => {
    bookingService.bookConference(mockConference);
    const secondTry = bookingService.bookConference(mockConference);
    expect(secondTry).toBe(false);
    expect(bookingService.bookedCount()).toBe(1);
  });

  it('should cancel booking and update bookedCount', () => {
    bookingService.bookConference(mockConference);
    expect(bookingService.bookedCount()).toBe(1);

    bookingService.cancelBooking(mockConference.title);
    expect(bookingService.bookedCount()).toBe(0);
    expect(bookingService.isBooked(mockConference.title)).toBe(false);
  });
});
