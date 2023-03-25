interface NavbarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavbarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavbarLoggedOutViewProps) => {
  return (
    <>
      <button type="button" onClick={onSignUpClicked}>
        Sign Up
      </button>
      <button type="button" onClick={onLoginClicked}>
        LogIn
      </button>
    </>
  );
};

export default NavbarLoggedOutView;
