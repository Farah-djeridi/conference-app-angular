import { TestBed } from '@angular/core/testing';
import { ConferenceService } from './conference.service';

describe('ConferenceService', () => {
  let service: ConferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial conferences', () => {
    expect(service.conferences().length).toBeGreaterThan(0);
  });

  it('should add a conference', () => {
    const initialCount = service.conferences().length;
    const newConf = service.addConference({
      title: 'TypeScript 5.9',
      description: 'Découverte des nouvelles syntaxes',
      category: 'Langages',
      date: '2026-11-20',
      place: 'Tunis',
      maxParticipants: 60,
    });

    expect(newConf.id).toBeDefined();
    expect(newConf.nbParticipants).toBe(0);
    expect(service.conferences().length).toBe(initialCount + 1);
  });

  it('should reserve a seat and increment nbParticipants', () => {
    const initialConf = service.conferences().find((c) => c.title === 'Angular 21');
    expect(initialConf).toBeDefined();
    const initialNb = initialConf!.nbParticipants;

    const reserved = service.reserveSeat('Angular 21');
    expect(reserved).toBe(true);

    const updatedConf = service.conferences().find((c) => c.title === 'Angular 21');
    expect(updatedConf!.nbParticipants).toBe(initialNb + 1);
  });

  it('should release a seat and decrement nbParticipants', () => {
    const conf = service.conferences().find((c) => c.title === 'Angular 21');
    const prevNb = conf!.nbParticipants;

    service.releaseSeat('Angular 21');
    const updated = service.conferences().find((c) => c.title === 'Angular 21');
    expect(updated!.nbParticipants).toBe(prevNb - 1);
  });
});
