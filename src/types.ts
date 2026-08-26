export interface WeddingDetails {
  groom: string;
  bride: string;
  groomFull: string;
  brideFull: string;
  date: string;
  targetDateTime: string; // ISO string for 2027-01-21T18:00:00
  timeString: string;
  venueName: string;
  venueCity: string;
  venueLocation: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export type TimeRemaining = TimeLeft;

export interface RSVPData {
  guestName: string;
  emailOrPhone: string;
  attendance: 'attending' | 'declined';
  numberOfGuests: number;
  dietaryOrNote: string;
  createdAt: string;
}

export interface WishMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}
