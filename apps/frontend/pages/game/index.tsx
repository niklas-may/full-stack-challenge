import type { NextPage } from "next";
import { useAuthGuard } from "../../hooks/guards/auth";
import { useGameRoll } from "../../hooks/queries/game";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "../../hooks/queries/account";

const FACES = { rolling: ["x", "x", "x", "x"], default: ["-", "-", "-", "-"] };

const Game: NextPage = () => {
  const isAuth = useAuthGuard();
  const { mutateAsync, data } = useGameRoll();
  const account = useAccount();

  const [isRolling, setIsRolling] = useState(false);
  const [faces, setFaces] = useState<string[]>(FACES.default);
  const [canRoll, setCanRoll] = useState(true);

  useEffect(() => {
    if (data?.faces) setFaces(data.faces);
    if (account.isFetched) {
      setCanRoll(!!account.data?.balance);
      setIsRolling(false);
    }
  }, [data, account.data, account.isFetched]);

  async function onRoll() {
    setIsRolling(true);
    setFaces(FACES.rolling);
    await new Promise((resolve) => setTimeout(resolve, 225));
    await mutateAsync();
  }

  return (
    <div className={classNames("flex items-center justify-center h-full", [!isAuth && "opacity-0"])}>
      <div className="w-full">
        <div
          className={classNames("grid flex-grow grid-cols-4 h-36 overflow-hidden rounded-lg border", [
            data?.won && "bg-green-900",
          ])}
        >
          {faces.map((face, index) => (
            <div key={index} className="my-auto text-center h-fit">
              {face}
            </div>
          ))}
        </div>

        <button className="w-full mt-4 btn" onClick={onRoll} disabled={!canRoll || isRolling}>
          Roll
        </button>
        <div className={classNames("mt-4 text-xs flex justify-center", [!canRoll && "alert alert-error"])}>
          <div>
            Visit your{" "}
            <Link href="/account" className="underline ">
              Account
            </Link>{" "}
            to deposit credits.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
