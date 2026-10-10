import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Medically supervised laser care</p>
          <h1>Smooth, clear, confident skin — safely.</h1>
          <p class="lead">
            Advanced laser treatments for hair removal, skin rejuvenation and pigmentation, delivered
            by certified specialists using FDA-cleared technology.
          </p>
          <div class="hero-actions">
            <a href="#book" class="btn btn-primary">Book a Free Consultation</a>
            <a href="#treatments" class="btn btn-ghost">Explore Treatments</a>
          </div>
          <ul class="hero-stats">
            <li><strong>10+</strong><span>Years experience</span></li>
            <li><strong>15k+</strong><span>Treatments done</span></li>
            <li><strong>All</strong><span>Skin types</span></li>
          </ul>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="hero-card">
            <p class="hero-card-title">Open six days a week</p>
            <p class="hero-card-time">Mon–Sat</p>
            <p class="hero-card-sub">Free consultation for every new client</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {}
