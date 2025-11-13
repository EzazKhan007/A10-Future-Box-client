import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import api from "../../services/api/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ category: "", status: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchIssues();
  }, [filter, search]);

  async function fetchIssues(){
    setLoading(true);
    try {
      const q = `?category=${filter.category}&status=${filter.status}&q=${encodeURIComponent(search)}`;
      const res = await api.get("/issues" + q);
      setIssues(res.data);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  return (
    <div className="h-screen flex-1 container mx-auto px-4 py-6">
      <div className="flex gap-2 mb-4">
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="border px-2 py-1 rounded"/>
        <select value={filter.category} onChange={e=>setFilter(s=>({...s,category:e.target.value}))} className="border px-2 py-1 rounded">
          <option value="">All categories</option>
          <option>Garbage</option>
          <option>Illegal Construction</option>
          <option>Broken Public Property</option>
          <option>Road Damage</option>
        </select>
        <select value={filter.status} onChange={e=>setFilter(s=>({...s,status:e.target.value}))} className="border px-2 py-1 rounded">
          <option value="">All statuses</option>
          <option value="ongoing">ongoing</option>
          <option value="ended">ended</option>
        </select>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {issues.map(issue=>(
            <div key={issue._id} className="border rounded p-3">
              <img src={issue.image} alt="" className="h-40 w-full object-cover rounded mb-2"/>
              <h3 className="font-semibold">{issue.title}</h3>
              <p className="text-xs">{issue.category} — {issue.location}</p>
              <p className="mt-1">Budget: ৳{issue.amount}</p>
              <Link to={`/issue/${issue._id}`} className="text-blue-600 text-sm inline-block mt-2">See Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
