import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ClinicApiService } from './core/clinic-api.service';
import { Header } from './sections/header';
import { Hero } from './sections/hero';
import { Treatments } from './sections/treatments';
import { About } from './sections/about';
import { Pricing } from './sections/pricing';
import { FaqSection } from './sections/faq';
import { BookingSection } from './sections/booking';
import { Footer } from './sections/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Treatments, About, Pricing, FaqSection, BookingSection, Footer],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-treatments [treatments]="treatments()" />
      <app-about />
      <app-pricing [plans]="pricing()" />
      <app-faq [faqs]="faqs()" />
      <app-booking [treatments]="treatments()" />
    </main>
    <app-footer />
  `,
})
export class App {
  private readonly api = inject(ClinicApiService);

  protected readonly treatments = toSignal(this.api.getTreatments(), { initialValue: [] });
  protected readonly pricing = toSignal(this.api.getPricing(), { initialValue: [] });
  protected readonly faqs = toSignal(this.api.getFaqs(), { initialValue: [] });
}
