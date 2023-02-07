import { registerOrSignUp } from "@/apis/authAPIs";
import Card from "@/components/atoms/Card";
import Error from "@/components/atoms/Error";
import LinkText from "@/components/atoms/LinkText";
import { AppContext } from "AppContext";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const { isAuthenticated } = useContext(AppContext);
  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);
  const [error, setError] = useState({ status: false, massage: "" });
  const [loading, setloading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setloading(true);
    setError({ status: false, massage: "" });

    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
      confirmpassword: e.target.confirmPassword.value,
    };

    try {
      const response = await registerOrSignUp(body);

      if (response?.status == 200) {
        toast.success("Account created successfully");
        Router.push("/signin");
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        setError({
          status: true,
          massage: "Email already exists, try to sign in",
        });
      }
    }

    setloading(false);
  };

  return (
    <>
      <div id="loginpage">
        <Card>
          {error.status && <Error message={error.massage} />}
          <h2>Sign Up</h2>
          <form autoComplete="off" onSubmit={handleSignup}>
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
            <input
              type="password"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <button type="submit">{loading ? "loading..." : "Sign Up"}</button>
          </form>
          <p>
            Already have an account? <LinkText path="signin" title="Sign In" />
          </p>
        </Card>
      </div>
    </>
  );
};

export default Signup;
