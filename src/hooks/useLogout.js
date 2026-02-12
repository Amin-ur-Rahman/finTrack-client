import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";
import Swal from "sweetalert2";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosPublic.post("/api/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      //    wiping out the cached data linked with useUser hook
      queryClient.setQueryData(["user"], null);

      //    refreshing the user state
      queryClient.invalidateQueries(["user"]);

      Swal.fire({
        title: "Logged Out",
        text: "User have been logged out",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });
};
