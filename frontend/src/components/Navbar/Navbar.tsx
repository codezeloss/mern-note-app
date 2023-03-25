import { User } from "../../models/user";
import NavbarLoggedInView from "./NavbarLoggedInView";
import NavbarLoggedOutView from "./NavbarLoggedOutView";
import { Link } from "react-router-dom";

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
      <div className="flex items-center gap-6">
        <Link to="/">
          <h1 className="text-xl">Note App</h1>
        </Link>
        <Link to="/privacy">
          <p className="text-xs text-white/80">Privacy</p>
        </Link>
      </div>

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
