import { queryOptions, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { client } from "../../lib/client";
import { useRouter } from "next/router";


export const authUserOptions = queryOptions({
  queryKey: ["auth-user"],
  queryFn: async () => {
    const res = await client("/auth/user");
    return res;
  },
});

export const useAuthSignup = () => {
  return useMutation({
    mutationFn: async (args: { email: string }) => {
      return await client("/auth/signup", {
        method: "POST",
        body: {
          email: args.email,
          password: "password", // TODO: Implement password
        },
      });
    }
  });
};

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (args: { email: string }) => {
      return await client("/auth/login", {
        method: "POST",
        body: {
          email: args.email,
          password: "password", // TODO: Implement password
        },
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authUserOptions.queryKey, data);
      console.log("data ", queryClient.getQueryData(authUserOptions.queryKey))
    },
  });
};

export const useAuthLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await client("/auth/logout", );
    },
    onSuccess: () => {
      queryClient.setQueryData(authUserOptions.queryKey, {});
    },
  });
};

export const useAuthUser = () => useQuery(authUserOptions)
