import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <section id="about" class="section section-alt">
      <div class="container split">
        <div>
          <p class="eyebrow">Why Lumière</p>
          <h2>Clinical expertise with a personal touch</h2>
          <p>
            Every treatment begins with a detailed skin assessment. Our certified laser therapists,
            supervised by a dermatologist, design a plan around your skin type, goals and lifestyle.
          </p>
          <ul class="checklist">
            @for (item of highlights; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
        <div class="steps">
          @for (step of steps; track step.title; let i = $index) {
            <div class="step">
              <span>{{ (i + 1).toString().padStart(2, '0') }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class About {
  protected readonly highlights = [
    'Dermatologist-supervised treatments',
    'FDA-cleared, latest-generation lasers',
    'Patch test before every new treatment',
    'Strict hygiene and safety protocols',
    'Transparent pricing, no hidden fees',
  ];

  protected readonly steps = [
    { title: 'Consultation', text: 'Free skin assessment and personalised treatment plan.' },
    { title: 'Patch Test', text: "We test your skin's response to ensure safe settings." },
    { title: 'Treatment', text: 'Comfortable sessions with cooling technology.' },
    { title: 'Aftercare', text: 'Clear guidance and follow-ups to track your results.' },
  ];
}
