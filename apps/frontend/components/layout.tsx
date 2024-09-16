import Link from "next/link";
import { useAuthLogout, useAuthUser } from "../hooks/queries/auth";
import { useRouter } from "next/router";
import { useAccount } from "../hooks/queries/account";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, isFetched } = useAuthUser();
  const { data: accountData, isFetched: isAccountFetched } = useAccount();
  const { mutateAsync } = useAuthLogout();
  const useRoute = useRouter();

  async function onLogout() {
    await mutateAsync();
    useRoute.push("/auth/login");
  }

  return (
    <div className="flex flex-col h-screen pt-12">
      {isFetched && (
        <div className="fixed inset-0 top-0 flex items-center justify-between p-4 h-fit">
          <Link href={!!data?.user.email ? "/game" : "/"}>
            <h1> PriceNow Casino </h1>
          </Link>
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Link className="btn btn-sm btn-ghost" href={"/account"}>
                {data.user.email} {isAccountFetched && <span>({accountData?.balance}$)</span>}
              </Link>
              <button className="btn btn-sm btn-ghost" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <nav className="flex gap-1">
              <Link className="btn btn-sm btn-outline" href={"/auth/login"}>
                Login
              </Link>
              <Link className="btn btn-sm btn-ghost" href={"/auth/signup"}>
                Signup
              </Link>
            </nav>
          )}
        </div>
      )}
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
};

export default Layout;
