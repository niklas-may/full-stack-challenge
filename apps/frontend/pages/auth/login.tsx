import type { NextPage } from "next";
import { useAuthLogin } from "../../hooks/query/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { mutate, data, isSuccess, isError, error } = useAuthLogin();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/game");
    }
  }, [isSuccess, router]);

  async function onSubmit(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    await mutate({ email: email as string });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Login</button>
        {isSuccess}
        {isError && <div>Invalid Creadentials</div>}
      </form>
    </div>
  );
};

export default Login;
