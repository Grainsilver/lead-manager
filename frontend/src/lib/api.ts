import { Lead, LeadStatus } from "@/types/lead";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// For creating a lead.
export interface CreateLeadInput {
  name: string;
  email: string;
  status?: LeadStatus;
}

// GET
export async function fetchLeads(): Promise<Lead[]> {
  const res = await fetch(`${API_URL}/leads`);
  if (!res.ok) {
    throw new Error("Failed to fetch leads.");
  }
  return res.json();
}

// POST
export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const res = await fetch(`${API_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    //  error messages.
    throw new Error(data.error || "Failed to create lead.");
  }

  return data;
}