// src/components/profile/ProfileForm.tsx
"use client";

import { User } from "@/types/User";
import { updateUserProfile } from "@/actions/user.actions";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function ProfileForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const onSubmit = async (data: { firstName: string; lastName: string }) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);

      const result = await updateUserProfile(formData, user._id);

      if (result.success) {
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-dark font-serif mb-8 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 mr-3 text-primary"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Personal Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-neutral-dark mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-secondary"
              } rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-neutral-dark mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-secondary"
              } rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border border-secondary rounded-lg px-4 py-3 bg-secondary-light/30 cursor-not-allowed"
            />
            <div className="absolute right-3 top-3 bg-white/80 text-xs text-neutral px-2 py-0.5 rounded">
              Verified
            </div>
          </div>
          <p className="text-xs text-neutral mt-2">
            Contact support if you need to change your email
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={`flex items-center justify-center py-3 px-8 rounded-lg transition-all ${
              isSubmitting || !isDirty
                ? "bg-accent/80 cursor-not-allowed"
                : "bg-accent hover:bg-accent-dark"
            } text-white font-medium shadow-sm hover:shadow-hover`}
          >
            <Pencil className="w-5 h-5 mr-2" />
            {isSubmitting ? "Saving Changes..." : "Update Profile"}
          </button>
        </div>

        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg animate-fade-in">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg animate-fade-in">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
