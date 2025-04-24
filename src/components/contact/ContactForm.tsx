/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message as string}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject", { required: "Subject is required" })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">
            {errors.subject.message as string}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message", { required: "Message is required" })}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-accent transition ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">
            {errors.message.message as string}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
      >
        Send Message
      </button>
    </form>
  );
}
