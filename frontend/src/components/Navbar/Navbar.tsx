import { User } from "../../models/user";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";

interface NavbarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const Navbar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavbarProps) => {
  return (
    <div className="bg-cyan-600 text-white flex items-center justify-between p-6 mb-4">
      <h1 className="text-xl">Note App</h1>

      <div className="flex items-center gap-4">
        {loggedInUser ? (
          <NavbarLoggedInView
            user={loggedInUser}
            onLogoutSuccessful={onLogoutSuccessful}
          />
        ) : (
          <NavbarLoggedOutView
            onSignUpClicked={onSignUpClicked}
            onLoginClicked={onLoginClicked}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
