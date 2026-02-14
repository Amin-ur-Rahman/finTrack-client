"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield, FaUserEdit } from "react-icons/fa";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";

const UsersManagement = () => {
  const queryClient = useQueryClient();
  const { user: loggedInUser } = useUser();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      const res = await axiosPublic.patch(`/user/role/${id}`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      Swal.fire({
        title: "Success!",
        text: "User role updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/user/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Deleted!", "User account has been removed.", "success");
    },
  });

  const handleRoleChange = (user, newRole) => {
    const action =
      newRole === "admin" ? "Promote to Admin?" : "Demote to User?";
    Swal.fire({
      title: action,
      text: `Change ${user.username}'s permissions?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id: user._id, newRole });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This will permanently delete the user's account and all their data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete Account",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          User Controls
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage system access and roles.
        </p>
      </div>

      <div className="bg-card border border-border rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Image
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                User Info
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Current Role
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan="3" className="p-8 text-center animate-pulse">
                  Scanning users...
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-muted/10 transition-colors"
                >
                  <td>
                    <Image
                      src={user.photoUrl}
                      width={60}
                      height={30}
                      className="rounded-4xl w-16 h-16 p-2"
                      alt={user.username}
                    ></Image>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">
                        {user.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        user.role === "admin"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.email !== loggedInUser?.email && (
                      <div className="flex justify-end gap-3">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => handleRoleChange(user, "user")}
                            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all uppercase"
                          >
                            <FaUserEdit /> Demote
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(user, "admin")}
                            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:opacity-80 transition-all uppercase"
                          >
                            <FaUserShield /> Make Admin
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-all"
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
