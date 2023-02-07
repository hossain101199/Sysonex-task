import { signIn } from "@/apis/authAPIs";
import Card from "@/components/atoms/Card";
import Error from "@/components/atoms/Error";
import LinkText from "@/components/atoms/LinkText";
import { AppContext } from "AppContext";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const { isAuthenticated } = useContext(AppContext);
  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);
  const [error, setError] = useState({ status: false, massage: "" });
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    setError({ status: false, massage: "" });

    const body = {
      password: e.target.password.value,
      email: e.target.email.value,
    };

    const response = await signIn(body);

    if (response?.status == 200) {
      toast.success(response.data);
      Router.push("/");
    }

    if (response?.response?.status == 400) {
      setError({
        status: true,
        massage: "No account was found with this email",
      });
    }

    if (response?.response?.status == 500) {
      setError({
        status: true,
        massage: response?.response?.data?.err,
      });
    }

    setloading(false);
  };
  return (
    <div id="loginpage">
      <Card>
        {error.status && <Error message={error.massage} />}
        <h2>Sign In</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
            name="password"
            placeholder="Password"
          />
          <button type="submit">{loading ? "loading..." : "Sign In"}</button>
        </form>
        <p>
          Don’t have an account? <LinkText path="signup" title="Sign Up" />
        </p>
      </Card>
    </div>
  );
};
export default SignIn;
