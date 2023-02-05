import Card from "@/components/atoms/Card";
import Error from "@/components/atoms/Error";
import LinkText from "@/components/atoms/LinkText";
import { useState } from "react";
import verifyUser from "../helper/verifyUser";

const Signin = () => {
  const [error, setError] = useState({ status: false, massage: "" });
  const [lodging, setlodging] = useState(false);

  const handleSubmit = async (e) => {
    setlodging(true);
    setError({ status: false, massage: "" });
    e.preventDefault();
    const body = {
      password: e.target.password.value,
      email: e.target.email.value,
    };
    const response = await fetch(
      "https://sysonex-admin-testing.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const responseData = await response.json();
    if (responseData?.err) {
      setError({ status: true, massage: responseData.err });
    } else if (Object.keys(responseData).length === 0) {
      setError({
        status: true,
        massage: "No account was found with this email",
      });
    } else {
      verifyUser(responseData);
    }
    setlodging(false);
  };
  return (
    <div id="loginpage">
      <Card>
        {error.status && <Error message={error.massage}></Error>}
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
          <button type="submit">{lodging ? "Lodging..." : "Sign In"}</button>
        </form>
        <p>
          Don’t have an account?{" "}
          <LinkText path="signup" title="Sign Up"></LinkText>
        </p>
      </Card>
    </div>
  );
};
export default Signin;
