import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="site-header" id="top">
      <div class="container nav">
        <a href="#top" class="logo" aria-label="Lumière Laser Clinic home">
          <span class="logo-mark">L</span>
          <span>Lumière <small>Laser Clinic</small></span>
        </a>
        <button
          class="nav-toggle"
          [attr.aria-expanded]="open()"
          aria-controls="nav-menu"
          aria-label="Toggle menu"
          (click)="open.set(!open())"
        >
          <span></span><span></span><span></span>
        </button>
        <nav id="nav-menu" class="nav-menu" [class.open]="open()" (click)="open.set(false)">
          <a href="#treatments">Treatments</a>
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a href="#book" class="btn btn-primary btn-sm">Book Now</a>
        </nav>
      </div>
    </header>
  `,
})
export class Header {
  protected readonly open = signal(false);
}
