"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { login } from "@/actions/auth.actions";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-primary-dark mb-2">
          Welcome Back
        </h2>
        <p className="text-neutral-dark">Sign in to your Alyce account</p>
      </div>

      {error && (
        <div className="bg-secondary-light text-primary-dark p-3 rounded-md text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary-dark mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            required
            placeholder="your@email.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary-dark"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-accent hover:text-accent-dark"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            required
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-accent text-white rounded-full font-medium hover:bg-accent-dark focus:ring-2 focus:ring-accent focus:ring-offset-2 flex justify-center items-center transition-colors shadow-sm"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          Sign In
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-primary-light"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-sm text-neutral-dark">
            Or continue with
          </span>
        </div>
      </div>

      <button
        // onClick={() => authService.googleLogin()}
        className="w-full py-2.5 px-4 border border-primary-light rounded-full hover:bg-primary-light/10 flex justify-center items-center gap-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-neutral-dark">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-accent hover:text-accent-dark font-medium"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
