import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../api/users";
import type { RegistrationRequest } from "../api/types";

export const useUsers = (page: number = 1, count: number = 6) => {
  return useQuery({
    queryKey: ["users", page, count],
    queryFn: () => usersApi.getUsers(page, count),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: usersApi.getPositions,
    staleTime: 10 * 60 * 1000, // 10 minutes - positions don't change often
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegistrationRequest) =>
      usersApi.registerUser(userData),
    onSuccess: () => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
