import { useQuery } from "@tanstack/react-query";
import axiosPublic from "@/api/axiosPublic";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/api/auth/me");
        return res.data;
      } catch (err) {
        return null;
      }
    },
    retry: false,
  });

  return { user, isLoading, refetch };
};
