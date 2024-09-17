import { useRouter } from "next/router";
import { useAuthUser } from "../queries/auth";
import { useEffect, useState } from "react";

// TODO: This guard causes a flicker when the user is not authenticated.
// There should be a better way to do this. Probably a middleware
export const useAuthGuard = () => {
  const { data, isLoading } = useAuthUser();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsAuthenticated(!!data?.user);
    }
    if (!data?.user && !isLoading) {
      router.push("/auth/login");
    }
  }, [data, router, isLoading, isAuthenticated]);

  return isAuthenticated;
};
