import type { NextPage } from "next";
import { useAuthSignup } from "../../hooks/queries/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Signup: NextPage = () => {
  const { mutate, data, isSuccess, isError, error } = useAuthSignup();
  const [isValid, setIsValid] = useState(false);

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

  function onInput(e: any) {
    const form = e.target.form;
    const valid = form.checkValidity();
    setIsValid(valid);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div>
        <h1 className="text-2xl">Signup</h1>

        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4" onInput={onInput}>
          <input className="input input-bordered" type="email" name="email" placeholder="Email" required />
          <button className="block btn btn-primary" type="submit" disabled={!isValid}>
            Signup
          </button>
          {isError && (
            <div role="alert" className="alert alert-error text-xs">
              {error.data?.message}
            </div>
          )}
        </form>
        <div className="mt-4 text-xs">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
