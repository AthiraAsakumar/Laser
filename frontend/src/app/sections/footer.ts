import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a href="#top" class="logo"><span class="logo-mark">L</span><span>Lumière <small>Laser Clinic</small></span></a>
          <p class="muted">Safe, effective laser treatments for every skin type.</p>
        </div>
        <nav class="footer-links" aria-label="Footer">
          <a href="#treatments">Treatments</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#book">Book</a>
        </nav>
        <p class="muted small">
          © {{ year }} Lumière Laser Clinic. All rights reserved.<br />Results vary between individuals.
        </p>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
}
