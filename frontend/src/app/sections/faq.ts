import { Component, input } from '@angular/core';
import { Faq } from '../core/models';

@Component({
  selector: 'app-faq',
  template: `
    <section id="faq" class="section section-alt">
      <div class="container narrow">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Frequently asked questions</h2>
        </div>
        <div class="faq">
          @for (faq of faqs(); track faq.question) {
            <details>
              <summary>{{ faq.question }}</summary>
              <p>{{ faq.answer }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqSection {
  readonly faqs = input.required<Faq[]>();
}
