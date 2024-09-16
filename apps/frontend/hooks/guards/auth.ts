import { useRouter } from "next/router";
import { useAuthUser } from "../queries/auth";
import { useEffect } from "react";

export const useAuthGuard= () => {
    const { data, isLoading } = useAuthUser();
    const router = useRouter();
  
    useEffect(() => {
      if (!data?.user && !isLoading) {
        router.push("/auth/login");
      }
    }, [data, router, isLoading]);
  };
  