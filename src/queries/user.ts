import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axios";
import { User } from "../types/user";

export const useUserMe = () => {
  return useQuery({
    queryKey: ["user me"],
    queryFn: async () =>
      await axios.get<User>("/api/user/me"),
  });
};