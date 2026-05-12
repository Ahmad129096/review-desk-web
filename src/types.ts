export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  defaultTone: "PROFESSIONAL" | "FRIENDLY" | "APOLOGETIC";
  website: string;
  phone: string;
  address: string;
}

export interface Review {
  id: string;
  businessId: string;
  reviewerName: string;
  rating: number;
  content: string;
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  needsFollowUp: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  businessId: string;
  reviewId: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
}

export interface GoogleLocation {
  accountName: string;
  locationName: string;
  title: string;
}
