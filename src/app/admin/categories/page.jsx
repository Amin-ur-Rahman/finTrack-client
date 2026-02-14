"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";
import AddCategoryModal from "@/components/modals/addCategoryModal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditCategoryModal from "@/components/modals/editCategoryModal";

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedCat, setSelectedCat] = useState();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/category/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      Swal.fire("Deleted!", "Category has been removed.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Users using this category might be affected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl  font-bold text-foreground uppercase  ">
            System Categories
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage global expense and income types.
          </p>
        </div>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-bold  text-xs tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95"
        >
          <FaPlus /> Add Category
        </button> */}
      </div>

      {/* Table Section */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 text-[10px] font-black  tracking-widest text-muted-foreground">
                  Category
                </th>
                <th className="p-4 text-[10px] font-black  tracking-widest text-muted-foreground">
                  Type
                </th>
                <th className="p-4 text-[10px] font-black  tracking-widest text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center animate-pulse">
                    Loading categories...
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-primary text-xl shadow-sm">
                          {getIcon(category.icon)}
                        </div> */}
                        <span className="font-bold text-foreground capitalize">
                          {category.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black   ${
                          category.type === "income"
                            ? "bg-success/10 text-success border border-success/20"
                            : "bg-danger/10 text-danger border border-danger/20"
                        }`}
                      >
                        {category.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setIsEditModalOpen(true);
                            setSelectedCat(category);
                          }}
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-all"
                          title="Edit"
                        >
                          <MdOutlineModeEditOutline size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-md transition-all"
                          title="Delete"
                        >
                          <FaTrashAlt size={16} />
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
        <EditCategoryModal
          isEditModalOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          category={selectedCat}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
