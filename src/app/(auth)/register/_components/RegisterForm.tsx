"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { register } from "@/actions/auth.actions";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     await googleLogin();
  //   } catch (error) {
  //     console.error("Google login failed:", error);
  //     setError("Google login failed");
  //   }
  // };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-primary-dark mb-2">
          Create Account
        </h2>
        <p className="text-neutral-dark">
          Begin your fragrance journey with us
        </p>
      </div>

      {error && (
        <div className="bg-secondary-light text-primary-dark p-3 rounded-md text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-primary-dark mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-primary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
              placeholder="Sophia"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-primary-dark mb-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-primary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              required
              placeholder="Laurent"
            />
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-primary-dark mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            required
            minLength={8}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-primary-dark mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-primary-light rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            required
            minLength={8}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-accent text-white rounded-full font-medium hover:bg-accent-dark focus:ring-2 focus:ring-accent focus:ring-offset-2 flex justify-center items-center transition-colors shadow-sm"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          Create Account
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

      <button className="w-full py-2.5 px-4 border border-primary-light rounded-full hover:bg-primary-light/10 flex justify-center items-center gap-2 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Continue with Google
      </button>

      <p className="mt-8 text-center text-sm text-neutral-dark">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-accent hover:text-accent-dark font-medium"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
