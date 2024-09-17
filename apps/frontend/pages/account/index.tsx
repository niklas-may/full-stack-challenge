import type { NextPage } from "next";
import { useAuthGuard } from "../../hooks/guards/auth";
import { useAccount, useAccountCashout, useAccountDeposit } from "../../hooks/queries/account";
import { useEffect, useState } from "react";
import { TrickyButton } from "../../components/TrickyButton";

const Account: NextPage = () => {
  useAuthGuard();
  const deposit = useAccountDeposit();
  const cashout = useAccountCashout();
  const account = useAccount();

  const [hasBalance, setHasBalance] = useState(false);

  useEffect(() => {
    const has = account.data?.balance && account.data?.balance > 0 ? true : false;
    setHasBalance(has);
  }, [account.data]);

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-full">
        <div>
          <button className="w-full mt-4 btn btn-primary" onClick={() => deposit.mutate()}>
            Add 10$
          </button>
          <TrickyButton
            size="md"
            type="button"
            classes="w-full mt-4 btn"
            onClick={() => cashout.mutate()}
            disabled={!hasBalance}
          >
            Cashout
          </TrickyButton>
        </div>
      </div>
    </div>
  );
};

export default Account;
