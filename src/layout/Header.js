import LinkText from "@/components/atoms/LinkText";
import SignOutButton from "@/components/atoms/SignOutButton";
import { getStoredData } from "@/utils/localStorage";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    const isLoggingIn = getStoredData("JWT");
    console.log(isLoggingIn);
  }, []);

  return (
    <nav>
      <LinkText path="/" title="Home"></LinkText>
      <LinkText path="/signin" title="Sign In"></LinkText>
      <SignOutButton></SignOutButton>
    </nav>
  );
};

export default Header;
