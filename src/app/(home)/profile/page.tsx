// src/app/profile/page.tsx
import ProfileForm from "@/components/profile/ProfileForm";
import OrdersSection from "@/components/profile/OrdersSection";
import { getUser } from "@/actions/user.actions";
import { User } from "lucide-react";
import LogoutButton from "@/components/profile/LogoutButton";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="bg-neutral-light min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-soft overflow-hidden border border-secondary-light">
          {/* Profile Header */}
          <div className="bg-primary-dark p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="bg-primary-light/20 p-4 rounded-full border border-primary-light/30">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold font-serif">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-secondary-light/90">{user.email}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <LogoutButton />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <ProfileForm user={user} />
            <OrdersSection orders={user.orders} />
          </div>
        </div>
      </div>
    </div>
  );
}
