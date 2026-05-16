import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["employee", "manager", "admin"]),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "employee" }
  });

  const onSubmit = (data) => {
    localStorage.setItem("token", "fake-jwt-token-123");
    localStorage.setItem("role", data.role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-card/60 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent tracking-wide mb-2">THRYVE</h1>
          <p className="text-gray-400 text-sm">Enterprise Performance Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-dark/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                placeholder="you@company.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                {...register("password")}
                type="password"
                className="w-full bg-dark/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Role (Demo)</label>
            <select
              {...register("role")}
              className="w-full bg-dark/50 border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary/50 outline-none appearance-none"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-600 bg-dark text-primary focus:ring-primary" />
              <span className="text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(139,127,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In to Thryve
          </button>
        </form>
      </div>
    </div>
  );
}
