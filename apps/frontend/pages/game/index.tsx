import type { NextPage } from "next";
import { useAuthGuard } from "../../hooks/guards/auth";
import { useGameRoll } from "../../hooks/queries/game";
import classNames from "classnames";
import Link from "next/link";

const Game: NextPage = () => {
  useAuthGuard();
  const { mutateAsync, data, isError, error } = useGameRoll();

  async function onRoll() {
    await mutateAsync();
  }

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-full">
        <div
          className={classNames("grid flex-grow grid-cols-4 h-36 overflow-hidden rounded-lg border", [
            data?.won && "bg-green-900",
          ])}
        >
          {data?.faces &&
            data.faces.map((face, index) => (
              <div key={index} className="my-auto text-center h-fit">
                {face}
              </div>
            ))}
        </div>
        <button className="w-full mt-4 btn" onClick={onRoll} disabled={data && data?.balance <= 0}>
          Roll
        </button>
        <div
          className={classNames("mt-4 text-xs text-center", [
            (isError || (data && data?.balance <= 0)) && "alert alert-error",
          ])}
        >
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
