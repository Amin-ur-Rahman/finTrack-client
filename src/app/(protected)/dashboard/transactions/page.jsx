"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import { MdOutlineModeEditOutline, MdSort } from "react-icons/md";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";
import { useUser } from "@/hooks/useUser";
import EditTransactionModal from "@/components/modals/editTransactionModal";

const UserTransactions = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email, search, filter, sortBy],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/transactions/${user?.email}`, {
        params: { search, type: filter, sort: sortBy },
      });
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/transactions/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      Swal.fire("Deleted!", "Record has been removed.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this record?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Transaction History
          </h1>
          <p className="text-muted-foreground text-sm">
            Detailed overview of your cash flow.
          </p>
        </div>

        <div className="flex bg-muted p-1 rounded-md">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
                filter === t
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* --- Search and Sort Bar --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <FaSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={14}
          />
          <input
            type="text"
            placeholder="Search by title or note..."
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:border-primary text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <MdSort
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <select
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md focus:outline-none focus:border-primary text-sm appearance-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="amount_desc">Highest Amount</option>
            <option value="amount_asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Title / Category</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center animate-pulse">
                    Loading records...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-10 text-center text-muted-foreground"
                  >
                    No transactions found.
                  </td>
                </tr>
              ) : (
                transactions.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-muted/10 transition-colors group"
                  >
                    <td className="p-4 text-sm font-medium">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`font-black ${item.type === "income" ? "text-success" : "text-danger"}`}
                      >
                        {item.type === "income" ? "+" : "-"} &nbsp;{" "}
                        {item.amount.toLocaleString()} ৳
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all"
                        >
                          <MdOutlineModeEditOutline size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-all"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserTransactions;
