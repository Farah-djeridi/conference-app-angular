import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConferenceDetail } from './conference-detail';

describe('ConferenceDetail', () => {
  let component: ConferenceDetail;
  let fixture: ComponentFixture<ConferenceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
