import Card from "@/components/atoms/Card";
import Error from "@/components/atoms/Error";
import LinkText from "@/components/atoms/LinkText";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";


const Signup = () => {
  const [error, setError] = useState(false);
  const [lodging, setlodging] = useState(false);

  const handleSignup = async (e) => {
    setlodging(true);
    setError(false);
    e.preventDefault();
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
      confirmpassword: e.target.confirmPassword.value,
    };

    const response = await fetch(
      "https://sysonex-admin-testing.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const responseData = await response.json();

    if (responseData?.name === "error") {
      setError(true);
    } else {
      toast.success("Account created successfully");
      Router.push("/signin");
    }
    setlodging(false);
  };

  return (
    <>
      <div id="loginpage">
        <Card>
          {error && (
            <Error message="Email already exists, try to sign in"></Error>
          )}
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
            <button type="submit">{lodging ? "Lodging..." : "Sign Up"}</button>
          </form>
          <p>
            Already have an account?{" "}
            <LinkText path="signin" title="Sign In"></LinkText>
          </p>
        </Card>
      </div>
    </>
  );
};

export default Signup;
