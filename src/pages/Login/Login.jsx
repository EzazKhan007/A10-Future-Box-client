import React from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Swal.fire("Welcome", "Logged in", "success");
      navigate("/");
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("email")} placeholder="Email" required className="w-full border p-2 rounded"/>
        <input type="password" {...register("password")} placeholder="Password" required className="w-full border p-2 rounded"/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <div className="mt-3">
        <button onClick={handleGoogle} className="bg-red-500 text-white px-4 py-2 rounded">Login with Google</button>
      </div>
      <div className="mt-3">
        <Link to="/register" className="text-sm underline">Register</Link>
      </div>
    </div>
  );
}
