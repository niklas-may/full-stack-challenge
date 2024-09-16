import type { NextPage } from "next";
import { useAuthGuard } from "../../hooks/guards/auth";
import { useAccount, useAccountCashout, useAccountDeposit } from "../../hooks/queries/account";

const Account: NextPage = () => {
  useAuthGuard();
  const deposit = useAccountDeposit();
  const cashout = useAccountCashout();
  const account = useAccount();

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="w-full">
        <div>
          <button className="w-full mt-4 btn btn-primary" onClick={() => deposit.mutate()}>
            Add 10$
          </button>
          <button
            className="w-full mt-4 btn"
            onClick={() => cashout.mutate()}
            disabled={!!account.data?.balance && account.data?.balance < 0}
          >
            Cashout 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
