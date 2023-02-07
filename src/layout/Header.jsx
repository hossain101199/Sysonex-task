import LinkText from "@/components/atoms/LinkText";
import SignOutButton from "@/components/atoms/SignOutButton";
import { AppContext } from "AppContext";
import { useContext } from "react";

const Header = () => {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <nav>
      <LinkText path="/" title="Home" />
      {isAuthenticated ? (
        <SignOutButton />
      ) : (
        <LinkText path="/signin" title="Sign In" />
      )}
    </nav>
  );
};

export default Header;
