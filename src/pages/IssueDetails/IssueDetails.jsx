import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import api from "../../services/api/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function IssueDetails({ user }) {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    fetchContribs();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/issues/${id}`);
      setIssue(res.data);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  const fetchContribs = async () => {
    try {
      const res = await api.get(`/contributions/issue/${id}`);
      setContributions(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleContribute = async (e) => {
    e.preventDefault();
    if (!user) { Swal.fire("Login required", "Please login first", "warning"); return }
    const form = e.target;
    const payload = {
      issueId: id,
      amount: Number(form.amount.value),
      name: form.name.value,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
      additionalInfo: form.info.value,
      date: new Date()
    };
    try {
      await api.post("/contributions", payload);
      Swal.fire("Thanks!", "Contribution received", "success");
      form.reset();
      fetchContribs();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save contribution", "error");
    }
  };

  if (loading || !issue) return <LoadingSpinner />;

  const totalCollected = contributions.reduce((s, c) => s + (c.amount || 0), 0);

  return (
    <div className="flex-1 container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <img src={issue.image} alt={issue.title} className="w-full h-80 object-cover rounded"/>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{issue.title}</h2>
          <p className="text-sm">{issue.category} — {issue.location}</p>
          <p className="mt-3">{issue.description}</p>
          <p className="mt-2">Budget: ৳{issue.amount}</p>
          <p className="mt-2">Date: {new Date(issue.date).toLocaleString()}</p>
          <p className="mt-2">Collected: ৳{totalCollected}</p>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Contribute</h3>
          <form onSubmit={handleContribute} className="space-y-2">
            <input name="name" placeholder="Your name" defaultValue={user?.displayName || ""} required className="w-full border p-2 rounded"/>
            <input name="amount" placeholder="Amount (BDT)" required className="w-full border p-2 rounded"/>
            <input name="phone" placeholder="Phone" className="w-full border p-2 rounded"/>
            <input name="address" placeholder="Address" className="w-full border p-2 rounded"/>
            <textarea name="info" placeholder="Additional info" className="w-full border p-2 rounded"/>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Pay Clean-Up Contribution</button>
          </form>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contributors</h3>
          <div className="space-y-2">
            {contributions.length === 0 ? <p>No contributions yet</p> : contributions.map(c => (
              <div key={c._id} className="flex items-center gap-3 border p-2 rounded">
                <div className="flex-1">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm">{c.email} • {new Date(c.date).toLocaleString()}</div>
                </div>
                <div>৳{c.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
