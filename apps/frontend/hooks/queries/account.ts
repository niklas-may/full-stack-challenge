import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../../lib/client";
import { Account } from "./account.types";
import { useAuthUser } from "./auth";

export const accountOption = queryOptions({
  queryKey: ["account"],
  queryFn: async () => {
    const res = await client<Account>("/account");
    return res;
  },
});

export const useAccount = () => {
  const data = useAuthUser();
  return useQuery({ ...accountOption, enabled: !!data.data?.user });
};

export const useAccountDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await client("/account/deposit");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountOption.queryKey });
    },
  });
};

export const useAccountCashout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await client("/account/cashout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountOption.queryKey });
    },
  });
};
