"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Errors = ({ error }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  //   console.log("searchParams", searchParams, "error", error);
  const errMgs = searchParams.get("error");
  return (
    <div>
      <h1 className=" text-red-800 font-bold "> {errMgs}</h1>

      <button className="mt-3 font-bold" onClick={() => router.back()}>
        Try Again
      </button>
    </div>
  );
};

export default Errors;
