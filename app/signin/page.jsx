import SignIn from "@components/SignIn";

const page = ({ searchParams: { callbackUrl } }) => {
  return (
    <div>
      <SignIn callbackUrl={callbackUrl || "/"} />
      {/* <SignIn callbackUrl={"/"} /> */}
    </div>
  );
};

export default page;
