export type ReportObj = {
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
