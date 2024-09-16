import Link from "next/link";
import { ReactNode } from "react";
import { useAuthLogout, useAuthUser } from "../hooks/query/auth";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data } = useAuthUser();
  const { mutateAsync } = useAuthLogout();
  const useRoute = useRouter();

  async function onLogout() {
    await mutateAsync();
    useRoute.push("/login");
  }
  return (
    <>
      {data?.user ? (
        <div>
          {data.user} <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link href={"/auth/signup"}>Signup</Link> <Link href={"/auth/login"}>Login</Link>
        </nav>
      )}
      <main>{children}</main>
    </>
  );
};

export default Layout;
