import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PricingPlan } from '../core/models';

@Component({
  selector: 'app-pricing',
  imports: [CurrencyPipe],
  template: `
    <section id="pricing" class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Pricing</p>
          <h2>Simple, transparent packages</h2>
          <p class="muted">Prices are per session. Package discounts available for course bookings.</p>
        </div>
        <div class="pricing">
          @for (plan of plans(); track plan.name) {
            <div class="price-card" [class.featured]="plan.featured">
              @if (plan.featured) {
                <p class="badge">Most popular</p>
              }
              <h3>{{ plan.name }}</h3>
              <p class="price">{{ plan.price | currency: 'USD' : 'symbol' : '1.0-0' }}<span>/session</span></p>
              <ul>
                @for (f of plan.features; track f) {
                  <li>{{ f }}</li>
                }
              </ul>
              <a href="#book" class="btn" [class.btn-primary]="plan.featured" [class.btn-ghost]="!plan.featured">Book Now</a>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Pricing {
  readonly plans = input.required<PricingPlan[]>();
}
