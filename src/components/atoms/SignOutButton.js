import { removeStorageData } from "@/utils/localStorage";

const SignOutButton = () => {
  const handleSignOut = () => {
    removeStorageData("JWT");
  };
  return (
    <button id="secondaryButton" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
