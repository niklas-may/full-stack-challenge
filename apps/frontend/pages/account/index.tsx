import type { NextPage } from "next";
import { useAuthGuard } from "../../hooks/guards/auth";

const Account: NextPage = () => {
  useAuthGuard();

  return (
    <div>
      <main>Account</main>
    </div>
  );
};

export default Account;
