
import { useForm} from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function validatePassword(pwd){
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const lengthOk = pwd.length >= 6;
    return hasUpper && hasLower && lengthOk;
  }

  const onSubmit = async (data) => {
    if (!validatePassword(data.password)) {
      return Swal.fire("Weak password", "Password must have uppercase, lowercase and at least 6 characters", "warning");
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(res.user, { displayName: data.name, photoURL: data.photoURL });
      Swal.fire("Success", "Registered", "success");
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
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name")} placeholder="Name" required className="w-full border p-2 rounded"/>
        <input {...register("photoURL")} placeholder="Photo URL" className="w-full border p-2 rounded"/>
        <input {...register("email")} placeholder="Email" required className="w-full border p-2 rounded"/>
        <input type="password" {...register("password")} placeholder="Password" required className="w-full border p-2 rounded"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
      <div className="mt-3">
        <button onClick={handleGoogle} className="bg-red-500 text-white px-4 py-2 rounded">Register with Google</button>
      </div>
      <div className="mt-3">
        <Link to="/login" className="text-sm underline">Login</Link>
      </div>
    </div>
  );
}
