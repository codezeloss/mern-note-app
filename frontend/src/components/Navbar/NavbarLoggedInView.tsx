import { User } from "../../models/user";
import * as NotesApi from "../../network/notes_api";

interface NavbarLoggedInView {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavbarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavbarLoggedInView) => {
  // ** LOG OUT function
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p>Signed in as: {user.username}</p>
      <button type="button" onClick={logout}>
        Logo Out
      </button>
    </>
  );
};

export default NavbarLoggedInView;
