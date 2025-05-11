"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handleGoogleCallback } from "@/actions/auth.actions";

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get("code");
      console.log("Received code:", code); // Debug log

      if (!code) {
        setError("No authorization code received");
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      try {
        await handleGoogleCallback(code);
        router.push("/profile");
      } catch (error: any) {
        console.error("Authentication error:", error);
        setError(error.message);
        setTimeout(() => router.push("/login"), 3000);
      }
    };

    handleAuth();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
        <p className="mt-4">Finalisation de l'authentification...</p>
      </div>
    </div>
  );
}
