import { getRoles } from "@/lib/roles";
import { Role } from "@/types/role";
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
  const {
    data: roles,
    isLoading: isLoadingRoles,
    error,
  } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
  return {
    roles,
    isLoadingRoles,
    error,
  };
};
