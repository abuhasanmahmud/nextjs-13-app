import { verifyWithCredentials } from "@action/authActions";
import Link from "next/link";
import React from "react";

const VerifyPage = async ({ searchParams: { token } }) => {
  //   console.log(token);
  const res = await verifyWithCredentials(token);
  return (
    <>
      <p>Your Email verify successfully </p>
      <Link href="/signin">Login now</Link>
    </>
  );
};

export default VerifyPage;
