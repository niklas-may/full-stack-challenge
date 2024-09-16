import type { NextPage } from "next";
import { useAuthUser } from "../../hooks/query/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Game: NextPage = () => {
  const { data , isSuccess} = useAuthUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!data?.user && isSuccess) {
      router.push("/auth/login");
    }
  }, [data, router, isSuccess]);
  return (
    <div>
      <main>Game</main>
    </div>
  );
};

export default Game;
