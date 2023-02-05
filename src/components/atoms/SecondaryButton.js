const SecondaryButton = ({ type = "submit", children }) => {
  return (
    <div id="secondaryButton">
      <button type="submit">{children}</button>
    </div>
  );
};

export default SecondaryButton;
