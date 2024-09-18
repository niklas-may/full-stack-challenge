import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../../lib/client";
import { GameRoll } from "./game.types";
import { accountOption } from "./account";

export const useGameRoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await client<GameRoll>("/game/roll");
      return res;
    },
    onSuccess: (data) => {
      const previousData = queryClient.getQueryData<GameRoll>(accountOption.queryKey)!;
      const newData = { ...previousData, balance: data.balance };
      queryClient.setQueryData(accountOption.queryKey, newData);

      return data;
    },
  });
};
