import { useEffect, useState } from "react";
import api from "../../services/api/api";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function MyIssues({ user }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ fetchMyIssues(); }, []);

  const fetchMyIssues = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/issues?email=${user.email}`);
      setIssues(res.data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this issue permanently?")) return;
    try {
      await api.delete(`/issues/${id}`);
      Swal.fire("Deleted", "Issue removed", "success");
      fetchMyIssues();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-6">
      <div className="w-full h-screen">
      <h2 className="text-2xl font-semibold mb-4">My Issues</h2>
      {loading ? <LoadingSpinner /> : (
        <div className="space-y-3">
          {issues.map(i => (
            <div key={i._id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{i.title}</div>
                <div className="text-xs">{i.category} • {i.location}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>window.location.href=`/issue/${i._id}`} className="px-3 py-1 bg-blue-600 text-white rounded">Details</button>
                <button onClick={()=>handleDelete(i._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
