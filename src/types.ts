export interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  time: string;
  isCustomResponse?: boolean;
  scanResult?: {
    images: {
      type: "cavity" | "calculus" | "healthy";
      score: number;
      status: string;
      borderColor: string;
      badgeBg: string;
      label: string;
    }[];
  };
  bookingSuggestedSlot?: {
    doctor: string;
    day: string;
    timeSlot: string;
    isBooked: boolean;
  };
}

export interface DemoRequest {
  name: string;
  email: string;
  clinicName: string;
  phone: string;
}

export interface TrialRequest {
  email: string;
  clinicName: string;
  acceptedTerms: boolean;
}
