import { Component, inject, input, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClinicApiService } from '../core/clinic-api.service';
import { Treatment } from '../core/models';

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

function todayIso(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule],
  template: `
    <section id="book" class="section">
      <div class="container split">
        <div>
          <p class="eyebrow">Book an Appointment</p>
          <h2>Start your journey to confident skin</h2>
          <p>Fill in the form and our team will contact you within one working day to confirm your appointment.</p>
          <div class="info-block" id="contact">
            <p><strong>Address</strong><br />123 Wellness Avenue, Suite 4<br />Your City, 00000</p>
            <p><strong>Phone</strong><br /><a href="tel:+10000000000">+1 (000) 000-0000</a></p>
            <p><strong>Email</strong><br /><a href="mailto:hello@lumiereclinic.example">hello&#64;lumiereclinic.example</a></p>
            <p><strong>Hours</strong><br />Mon–Fri 9:00–19:00<br />Sat 10:00–16:00 · Sun closed</p>
          </div>
        </div>

        <form class="booking-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="field" [class.invalid]="showError('name')">
            <label for="name">Full name</label>
            <input id="name" type="text" autocomplete="name" formControlName="name" />
            @if (showError('name')) { <small class="error">Please enter your name.</small> }
          </div>
          <div class="field-row">
            <div class="field" [class.invalid]="showError('phone')">
              <label for="phone">Phone</label>
              <input id="phone" type="tel" autocomplete="tel" formControlName="phone" />
              @if (showError('phone')) { <small class="error">Enter a valid phone number.</small> }
            </div>
            <div class="field" [class.invalid]="showError('email')">
              <label for="email">Email</label>
              <input id="email" type="email" autocomplete="email" formControlName="email" />
              @if (showError('email')) { <small class="error">Enter a valid email.</small> }
            </div>
          </div>
          <div class="field-row">
            <div class="field" [class.invalid]="showError('treatment')">
              <label for="treatment">Treatment</label>
              <select id="treatment" formControlName="treatment">
                <option value="">Select a treatment</option>
                @for (t of treatments(); track t.id) {
                  <option [value]="t.id">{{ t.name }}</option>
                }
                <option value="consultation">Not sure — consultation</option>
              </select>
              @if (showError('treatment')) { <small class="error">Choose a treatment.</small> }
            </div>
            <div class="field" [class.invalid]="showError('preferred_date')">
              <label for="date">Preferred date</label>
              <input id="date" type="date" [min]="minDate" formControlName="preferred_date" />
              @if (showError('preferred_date')) { <small class="error">Pick a date.</small> }
            </div>
          </div>
          <div class="field">
            <label for="message">Message (optional)</label>
            <textarea id="message" rows="3" formControlName="message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block" [disabled]="status().kind === 'sending'">
            {{ status().kind === 'sending' ? 'Sending…' : 'Request Appointment' }}
          </button>
          <p class="form-status" [class]="status().kind" role="status" aria-live="polite">{{ status().message }}</p>
        </form>
      </div>
    </section>
  `,
})
export class BookingSection {
  readonly treatments = input.required<Treatment[]>();

  private readonly api = inject(ClinicApiService);
  protected readonly minDate = todayIso();
  protected readonly status = signal<Status>({ kind: 'idle', message: '' });

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{6,25}$/)]],
    email: ['', [Validators.required, Validators.email]],
    treatment: ['', Validators.required],
    preferred_date: ['', Validators.required],
    message: [''],
  });

  protected showError(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set({ kind: 'error', message: 'Please correct the highlighted fields.' });
      return;
    }
    this.status.set({ kind: 'sending', message: '' });
    const value = this.form.getRawValue();
    this.api.createBooking({ ...value, message: value.message.trim() || null }).subscribe({
      next: () => {
        this.form.reset();
        this.status.set({
          kind: 'success',
          message: "Thank you! We've received your request and will contact you shortly.",
        });
      },
      error: (err: HttpErrorResponse) => {
        const detail = typeof err.error?.detail === 'string' ? err.error.detail : null;
        this.status.set({
          kind: 'error',
          message: detail ?? 'Sorry, something went wrong. Please try again or call us.',
        });
      },
    });
  }
}
