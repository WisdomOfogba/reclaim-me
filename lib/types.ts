export type ComplaintObj = {
  id: string;
  type: string;
  status: string;
  date: string;
  priority: string;
  description: string;
  lastUpdate: string;
  amount: string;
  location: string;
  assignedAgent: string;
  timeline: { date: string; action: string; status: string }[];
  evidence: string[];
  notes: string;
};

export type GeneratedDocument = {
  name: string;
  phone: string;
  email: string;
  address: string;
  scamType: string;
  dateTime: string;
  description: string;
  amount: number;
  /** 3 letter country code e.g NGN */
  currency: string;
  paymentMethod: string;
  /** Scammers details if any */
  beneficiary: {
    name: string;
    bank: string;
    account: string;
  };
};
