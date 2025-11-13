import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "../../services/api/api";

export default function AddIssue({ user }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
    
      const payload = {
        ...data,
        amount: Number(data.amount),
        email: user.email,
        status: "ongoing",
        date: new Date()
      };
      await api.post("/issues", payload);
      Swal.fire("Success", "Issue created", "success");
      reset();
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to create issue", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto h-[100vh]">
      <h2 className="text-2xl font-semibold mb-4">Add Issue</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("title")} placeholder="Issue Title" required className="w-full border p-2 rounded" />
        <select {...register("category")} required className="w-full border p-2 rounded">
          <option value="">Select Category</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>
        <input {...register("location")} placeholder="Location" required className="w-full border p-2 rounded" />
        <textarea {...register("description")} placeholder="Description" required className="w-full border p-2 rounded"></textarea>
        <input {...register("image")} placeholder="Image URL" required className="w-full border p-2 rounded" />
        <input {...register("amount")} placeholder="Suggested Budget (BDT)" required className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2  rounded">Submit</button>
      </form>
    </div>
  );
}
