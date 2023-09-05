import SignUp from "@components/SignUp";

const page = ({ searchParams: { callbackUrl } }) => {
  return (
    <div>
      <SignUp callbackUrl={callbackUrl || "/"} />
    </div>
  );
};

export default page;
