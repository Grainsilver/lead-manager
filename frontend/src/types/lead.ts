export type LeadStatus =
  | "New"
  | "Engaged"
  | "ProposalSent"
  | "ClosedWon"
  | "ClosedLost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
}

//  labels
export const STATUS_LABELS: Record<LeadStatus, string> = {
  New: "New",
  Engaged: "Engaged",
  ProposalSent: "Proposal Sent",
  ClosedWon: "Closed-Won",
  ClosedLost: "Closed-Lost",
};