import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar/Navbar";
import NotesLoggedInPage from "./components/NotesLoggedInPage";
import SignUpModal from "./components/SignUpModal";

function App() {
  return (
    <div className="w-full h-[100vh]">
      {/* Navbar */}
      <Navbar
        loggedInUser={null}
        onSignUpClicked={() => {}}
        onLoginClicked={() => {}}
        onLogoutSuccessful={() => {}}
      />

      {/* Notes */}
      <NotesLoggedInPage />

      {/* Auth Modals */}
      <div className="my-10">
        {false && (
          <SignUpModal onDismiss={() => {}} onSignUpSuccessful={() => {}} />
        )}

        {false && (
          <LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
        )}
      </div>
    </div>
  );
}

export default App;
