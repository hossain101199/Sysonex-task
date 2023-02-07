import { removeStorageData } from "@/utils/localStorage";
import { AppContext } from "AppContext";
import Router from "next/router";
import { useContext } from "react";

const SignOutButton = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const handleSignOut = () => {
    removeStorageData("JWT");
    setIsAuthenticated(false);
    Router.push("/signin");
  };
  return (
    <button id="secondaryButton" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
