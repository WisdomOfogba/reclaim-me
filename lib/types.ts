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

export type ScamReportData = {
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

export type ApiReport = {
  id: number;
  scamType: string | null;
  status: string | null;
  incidentDate?: string | null;
  createdAt?: string | null;
  pdfLink: string | null; // Assuming this is optional
  // priority?: string | null; // Uncomment if priority exists
};

export type ApiReport$1 = Omit<ApiReport, "pdfLink"> & {
  pdfUrl: string | null;
};
