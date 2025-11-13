import React, { useEffect, useState } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import api from "../../services/api/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function MyContributions({ user }) {
  const [contribs, setContribs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetchContribs(); }, []);

  const fetchContribs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/contributions?email=${user.email}`);
      setContribs(res.data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const downloadReport = (rec) => {
    const doc = new jsPDF();
    doc.text("Contribution Receipt", 14, 20);
    doc.autoTable({
      head: [["Field","Value"]],
      body: [
        ["Name", rec.name],
        ["Email", rec.email],
        ["Issue ID", rec.issueId],
        ["Amount", `৳${rec.amount}`],
        ["Date", new Date(rec.date).toLocaleString()],
        ["Address", rec.address || ""],
        ["Additional Info", rec.additionalInfo || ""]
      ],
      startY: 30
    });
    doc.save(`contribution-${rec._id}.pdf`);
  };

  return (
    <div className="flex-1 container mx-auto h-[100vh] px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">My Contributions</h2>
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {contribs.map(c => (
            <div key={c._id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold mb-2">{c.name} • ৳{c.amount}</div>
                <div className="text-xs mb-2">{new Date(c.date).toLocaleString()}</div>
                <div className="text-xs">Issue: {c.issueId}</div>
              </div>
              <div>
                <button onClick={()=>downloadReport(c)} className="px-3 py-1 bg-blue-600 text-white rounded">Download Report</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
