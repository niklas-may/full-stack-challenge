import type { NextPage } from "next";
import { useAuthLogin } from "../../hooks/queries/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login: NextPage = () => {
  const { mutate, data, isSuccess, isError, error } = useAuthLogin();
  const [isValid, setIsValid] = useState(false);

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

  function onInput(e: any) {
    const form = e.target.form;
    const valid = form.checkValidity();
    setIsValid(valid);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div>
        <h1 className="text-2xl">Login</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4" onInput={onInput}>
          <input className="input input-bordered" type="email" name="email" placeholder="Email" required />
          <button className="block btn btn-primary" type="submit" disabled={!isValid}>
            Login
          </button>
          {isError && (
            <div role="alert" className="text-xs alert alert-error">
              Invalid Credentials
            </div>
          )}
        </form>
        <div className="mt-4 text-xs">Are you not signed up yet? <Link href="/auth/signup" className="underline">Signup</Link></div>
      </div>
    </div>
  );
};

export default Login;
