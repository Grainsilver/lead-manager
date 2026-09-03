import { Lead, STATUS_LABELS } from "@/types/lead";

interface LeadListProps {
  leads: Lead[];
}


const STATUS_STYLES: Record<string, string> = {
  New: "bg-gray-100 text-gray-700",
  Engaged: "bg-blue-100 text-blue-700",
  ProposalSent: "bg-yellow-100 text-yellow-700",
  ClosedWon: "bg-green-100 text-green-700",
  ClosedLost: "bg-red-100 text-red-700",
};

export default function LeadList({ leads }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No leads yet. Add your first one above.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-sm font-semibold text-gray-700">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4 text-gray-900">{lead.name}</td>
              <td className="px-6 py-4 text-gray-600">{lead.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                    STATUS_STYLES[lead.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {STATUS_LABELS[lead.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}