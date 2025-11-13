import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api/api";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import HeroBanner from "../../components/home/Hero";
import CategorySection from "../../components/home/CategorySection";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLatest(){
      setLoading(true);
      try {
        const res = await api.get("/issues?limit=6&sort=-date");
        setLatest(res.data);
      } catch (e) {
        console.error(e);
      } finally { setLoading(false); }
    }
    fetchLatest();
  }, []);

  return (

    <>
    
    <HeroBanner/>
   

    <div className="flex-1 container mx-auto px-4 py-6">
      <CategorySection/>

      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-10">Recent Complaints</h2>
        {loading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latest.map(issue => (
              <div key={issue._id} className="border p-5 rounded shadow">
                <img src={issue.image} alt={issue.title} className="h-40 w-full object-cover rounded mb-2"/>
                <h3 className="font-semibold">{issue.title}</h3>
                <p className="text-sm">{issue.description?.slice(0,100) || ""}</p>
                <p className="text-xs mt-1">{issue.category} — {issue.location}</p>
                <Link to={`/issue/${issue._id}`} className="mt-4 inline-block text-sm font-semibold text-blue-600 border p-4 w-full text-center rounded ">See Details</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
     </>
  );
}
