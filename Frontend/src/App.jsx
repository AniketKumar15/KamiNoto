import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import SmoothCursor from "./Components/SmoothCursor";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Notes from "./Pages/Notes";
import NoteState from "./Contexts/NotesContext/NoteState";
import AddNote from "./Components/AddNote";
import AuthState from "./Contexts/AuthContext/AuthState";
import Login from "./Pages/Login";
import SignUP from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute"
import UpdateProfile from "./Pages/UpdateProfile";

const App = () => {


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:text-white">
      {/* <SmoothCursor /> */}
      <AuthState>
        <NoteState>
          <Router>
            <NavBar />
            <SideBar />
            <AddNote />
            <Routes>
              <Route exact path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route exact path="/notes" element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              } />
              <Route exact path="/profile" element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              } />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUP />} />
            </Routes>
          </Router>
        </NoteState>
      </AuthState>
    </div>
  );
};

export default App;
