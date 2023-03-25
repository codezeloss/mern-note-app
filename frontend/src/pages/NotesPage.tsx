import NotesLoggedInPage from "../components/NotesLoggedInPage";
import NotesLoggedOutPage from "../components/NotesLoggedOutPage";
import { User } from "../models/user";

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <div>{loggedInUser ? <NotesLoggedInPage /> : <NotesLoggedOutPage />}</div>
  );
};

export default NotesPage;
