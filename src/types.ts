export interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  time: string;
  isCustomResponse?: boolean;
  scanResult?: {
    images: {
      type: "cavity" | "calculus" | "healthy" | "malaligned" | "stains" | "smokers_palate";
      score: number;
      status: string;
      borderColor: string;
      badgeBg: string;
      label: string;
      description?: string;
    }[];
    mode?: "custom_chipped_molar";
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
