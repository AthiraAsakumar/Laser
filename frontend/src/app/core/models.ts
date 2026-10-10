export interface Treatment {
  id: string;
  name: string;
  icon: string;
  description: string;
  duration: string;
  sessions: string;
}

export interface PricingPlan {
  name: string;
  price: number;
  features: string[];
  featured: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferred_date: string;
  message: string | null;
}

export interface Booking extends BookingRequest {
  id: number;
}
