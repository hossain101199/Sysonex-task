import LinkText from "@/components/atoms/LinkText";
import { useEffect, useState } from "react";

const Header = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUserData(data);
  }, []);
  return (
    <nav>
      <LinkText path="/" title="Home"></LinkText>
      <LinkText path="/signin" title="Sign In"></LinkText>
    </nav>
  );
};

export default Header;
