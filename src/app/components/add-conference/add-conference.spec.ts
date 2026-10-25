import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AddConferenceComponent } from './add-conference';
import { ConferenceService } from '../../services/conference.service';

describe('AddConferenceComponent', () => {
  let component: AddConferenceComponent;
  let fixture: ComponentFixture<AddConferenceComponent>;
  let conferenceService: ConferenceService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConferenceComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    conferenceService = TestBed.inject(ConferenceService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AddConferenceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values and be invalid initially', () => {
    expect(component.conferenceForm).toBeDefined();
    expect(component.conferenceForm.valid).toBe(false);
    expect(component.isFormValid()).toBe(false);
  });

  it('should compute real-time character count using Signals', () => {
    expect(component.charCount()).toBe(0);

    const descControl = component.conferenceForm.get('description');
    descControl?.setValue('Une description très détaillée pour tester le signal');
    fixture.detectChanges();

    expect(component.charCount()).toBe(52);
  });

  it('should become valid when all required fields and valid future date are supplied', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const dateStr = futureDate.toISOString().split('T')[0];

    component.conferenceForm.setValue({
      title: 'DevOps & Kubernetes',
      description: 'Session avancée sur le déploiement continu et la conteneurisation.',
      category: 'Cloud',
      place: 'Tunis',
      date: dateStr,
      maxParticipants: 150,
    });

    fixture.detectChanges();
    expect(component.conferenceForm.valid).toBe(true);
    expect(component.isFormValid()).toBe(true);
  });

  it('should add conference to service and navigate on submit', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 20);
    const dateStr = futureDate.toISOString().split('T')[0];

    component.conferenceForm.setValue({
      title: 'Intelligence Artificielle 2027',
      description: 'Découverte des modèles génératifs et agents autonomes.',
      category: 'IA',
      place: 'Sousse',
      date: dateStr,
      maxParticipants: 80,
    });

    const initialLength = conferenceService.conferences().length;
    component.onSubmit();

    expect(conferenceService.conferences().length).toBe(initialLength + 1);
    expect(navigateSpy).toHaveBeenCalledWith(['/conferences']);
  });
});
