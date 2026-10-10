import { Component, input } from '@angular/core';
import { Treatment } from '../core/models';

@Component({
  selector: 'app-treatments',
  template: `
    <section id="treatments" class="section">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Our Treatments</p>
          <h2>Tailored laser solutions for every skin concern</h2>
        </div>
        <div class="cards">
          @for (t of treatments(); track t.id) {
            <article class="card">
              <div class="card-icon">{{ t.icon }}</div>
              <h3>{{ t.name }}</h3>
              <p>{{ t.description }}</p>
              <span class="card-meta">{{ t.duration }} · {{ t.sessions }}</span>
            </article>
          } @empty {
            <p class="muted">Loading treatments…</p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Treatments {
  readonly treatments = input.required<Treatment[]>();
}
