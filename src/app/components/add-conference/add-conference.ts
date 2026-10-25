import { Component, computed, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConferenceService } from '../../services/conference.service';

/** Validateur personnalisé : la date doit être postérieure à aujourd'hui */
export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today ? null : { pastDate: true };
}

@Component({
  selector: 'app-add-conference',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-conference.html',
  styleUrl: './add-conference.css',
})
export class AddConferenceComponent {
  private readonly fb = inject(FormBuilder);
  private readonly conferenceService = inject(ConferenceService);
  private readonly router = inject(Router);

  /**
   * Prosit 2 : Création de la structure du formulaire avec FormGroup & FormControl
   * et définition des contraintes logiques via Validators
   */
  readonly conferenceForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(15)]],
    category: ['Web', [Validators.required]],
    place: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', [Validators.required, futureDateValidator]],
    maxParticipants: [100, [Validators.required, Validators.min(10), Validators.max(2000)]],
  });

  /**
   * Prosit 3 : Combinaison Reactive Forms & Signals via toSignal()
   * Alternative propre et performante à valueChanges.subscribe() et statusChanges.subscribe()
   * Pas de fuite mémoire, désabonnement automatique !
   */
  readonly formValues = toSignal(this.conferenceForm.valueChanges, {
    initialValue: this.conferenceForm.value,
  });

  readonly formStatus = toSignal(this.conferenceForm.statusChanges, {
    initialValue: this.conferenceForm.status,
  });

  /** Compteur de caractères en temps réel dérivé via computed() */
  readonly charCount = computed(() => {
    const desc = this.formValues()?.description;
    return typeof desc === 'string' ? desc.length : 0;
  });

  /** État de validité réactif */
  readonly isFormValid = computed(() => this.formStatus() === 'VALID');

  /** Getters pratiques pour le template */
  get title() {
    return this.conferenceForm.get('title');
  }
  get description() {
    return this.conferenceForm.get('description');
  }
  get category() {
    return this.conferenceForm.get('category');
  }
  get place() {
    return this.conferenceForm.get('place');
  }
  get date() {
    return this.conferenceForm.get('date');
  }
  get maxParticipants() {
    return this.conferenceForm.get('maxParticipants');
  }

  onSubmit(): void {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    const val = this.conferenceForm.value;
    this.conferenceService.addConference({
      title: val.title,
      description: val.description,
      category: val.category,
      place: val.place,
      date: val.date,
      maxParticipants: Number(val.maxParticipants),
    });

    // Redirection automatique vers la liste des conférences
    this.router.navigate(['/conferences']);
  }
}
