import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NoteState from "./Context/NoteState";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import Notes from "./Components/Notes";
import Edit from "./Components/MainNote/Edit";
import UserHomePage from "./Components/UserHomePage";
import UserContact from "./Components/MainContact/UserContact";
import AllContact from "./Components/MainContact/AllContact";
import Yournote from "./Components/MainNote/Yournote";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/yournotes" element={<Yournote />} />
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Routes>
            <Route path="/signin" element={<Login />} />
          </Routes>
          <Routes>
            <Route path="/Note" element={<Notes />} />
          </Routes>
          <Routes>
            <Route path="/edit" element={<Edit />} />
          </Routes>
          <Routes>
            <Route path="/userhome" element={<UserHomePage />} />
          </Routes>
          <Routes>
            <Route path="/contact" element={<UserContact />} />
          </Routes>
          <Routes>
            <Route path="/contactdetails" element={<AllContact />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
