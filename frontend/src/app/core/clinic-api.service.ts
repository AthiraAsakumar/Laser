import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Booking, BookingRequest, Faq, PricingPlan, Treatment } from './models';

@Injectable({ providedIn: 'root' })
export class ClinicApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  getTreatments() {
    return this.http.get<Treatment[]>(`${this.baseUrl}/treatments`);
  }

  getPricing() {
    return this.http.get<PricingPlan[]>(`${this.baseUrl}/pricing`);
  }

  getFaqs() {
    return this.http.get<Faq[]>(`${this.baseUrl}/faqs`);
  }

  createBooking(booking: BookingRequest) {
    return this.http.post<Booking>(`${this.baseUrl}/bookings`, booking);
  }
}
