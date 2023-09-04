"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Signout = () => {
  return (
    <div>
      <button onClick={signOut}>Singout</button>
    </div>
  );
};

export default Signout;
