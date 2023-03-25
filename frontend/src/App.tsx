import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar/Navbar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPage from "./pages/NotesPage";
import NotFound from "./pages/NotFound";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="w-full h-[100vh]">
        {/* Navbar */}
        <Navbar
          loggedInUser={loggedInUser}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLoginClicked={() => setShowLoginModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />

        {/* Notes */}
        <Routes>
          <Route path="/" element={<NotesPage loggedInUser={loggedInUser} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        {/* Auth Modals */}
        <div className="my-10">
          {showSignUpModal && (
            <SignUpModal
              onDismiss={() => setShowSignUpModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user);
                setShowSignUpModal(false);
              }}
            />
          )}

          {showLoginModal && (
            <LoginModal
              onDismiss={() => setShowLoginModal(false)}
              onLoginSuccessful={(user) => {
                setLoggedInUser(user);
                setShowLoginModal(false);
              }}
            />
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
