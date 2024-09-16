import type { NextPage } from "next";
import { useAuthSignup } from "../../hooks/query/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const {mutate, data, isSuccess, isError, error} = useAuthSignup();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/auth/login");
    }
  }, [isSuccess, router]);

  function onSubmit(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    mutate({ email: email as string });
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Signup</button>
        {isSuccess}
        {isError && <div>{error.data?.message}</div>}
      </form>
    </div>
  );
};

export default Signup;
