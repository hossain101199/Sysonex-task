import Router from "next/router";
import { toast } from "react-hot-toast";
const verifyUser = async (responseData) => {
  const body = {
    token: responseData,
  };

  const getUserJWT = await fetch(
    "https://sysonex-admin-testing.onrender.com/login/t",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const userJWT = await getUserJWT.json();

  const verifyAUT = await fetch(
    "https://sysonex-admin-testing.onrender.com/auth",
    {
      method: "POST",
      headers: {
        authorization: `beater ${userJWT}`,
      },
    }
  );
  const status = await verifyAUT.json();

  toast.success(status);
  Router.push("/");
};
export default verifyUser;
