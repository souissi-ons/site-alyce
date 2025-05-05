// src/components/profile/LogoutButton.tsx
"use client";

import { logout } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors group"
    >
      <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      <span>Sign Out</span>
    </button>
  );
}
