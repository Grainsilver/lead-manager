"use client";

import { useEffect, useState } from "react";
import { fetchLeads } from "@/lib/api";
import { Lead } from "@/types/lead";
import LeadForm from "@/components/LeadForm";
import LeadList from "@/components/LeadList";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load leads once on mount.
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchLeads();
        setLeads(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load leads.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Prepend the new lead so it shows at the top immediately (optimistic update).
  function handleLeadAdded(newLead: Lead) {
    setLeads((prev) => [newLead, ...prev]);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Lead Manager
        </h1>

        <LeadForm onLeadAdded={handleLeadAdded} />

        {loading && (
          <div className="text-center text-gray-500 py-8">Loading leads...</div>
        )}

        {error && !loading && (
          <div className="bg-red-50 text-red-700 rounded-lg p-4 text-center">
            {error}
          </div>
        )}

        {!loading && !error && <LeadList leads={leads} />}
      </div>
    </main>
  );
}