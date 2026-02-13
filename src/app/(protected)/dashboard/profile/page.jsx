"use client";
import React, { useState } from "react";

import Image from "next/image";
import { FaUser, FaEnvelope, FaCoins, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

import { useUser } from "@/hooks/useUser";
import Skeleton from "@/components/loading/skeleton";
import EditProfileModal from "@/components/modals/editProfileModal";

const ProfilePage = () => {
  const { user, isLoading } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading)
    return (
      <div className="p-10">
        <Skeleton className="h-[400px] w-full rounded-md" />
      </div>
    );

  // console.log(user);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-card border border-border rounded-md overflow-hidden shadow-sm">
        <div className="h-32 bg-linear-to-r from-primary/20 to-primary/5" />
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-4 flex justify-between items-end">
            <div className="relative h-32 w-32 rounded-md border-4 border-card overflow-hidden bg-muted">
              <Image
                src={user?.photoUrl || "/profile-generic.jpeg"}
                alt="Profile"
                fill
                loading="eager"
                className="object-cover"
                sizes="128px"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-bold hover:opacity-90 transition-all active:scale-95"
            >
              <MdOutlineModeEdit /> Edit Profile
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-black italic">{user?.username}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <InfoTile icon={<FaUser />} label="Role" value={user?.role} />
            <InfoTile
              icon={<FaCoins />}
              label="Default Currency"
              value={user?.currency || "USD"}
            />
            <InfoTile
              icon={<FaCalendarAlt />}
              label="Joined"
              value={new Date(user?.createdAt).toLocaleDateString()}
            />
            <InfoTile
              icon={<FaEnvelope />}
              label="Account Status"
              value="Verified"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal user={user} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

const InfoTile = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-md bg-muted/30 border border-border/50">
    <div className="text-primary text-lg">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
        {label}
      </p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default ProfilePage;
