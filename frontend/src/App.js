import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Nonexistent from "./pages/Nonexistent";
import Navbar from "./components/Navbar";
import Publish from "./pages/Publish";
import {useState} from "react";
import UserProfile from "./pages/UserProfile";


// style = {{backgroundImage: "url('/bg.jpg')"}}

function App() {
    const [user, set_user] = useState(null);

    console.log(user);

    return (
          <div className = "vh-100 m-0 overflow-hidden" style={{backgroundColor: "#2A2A2A"}}>
              <BrowserRouter>
                  <Navbar user = {user} set_user={set_user}></Navbar>
                  <Routes>
                      <Route path = "/" element={<Landing />}></Route>
                      <Route path = "/stories" element={<Main />}></Route>
                      <Route path = "/publish" element={<Publish user = {user}/>}></Route>
                      <Route path = "/myprofile" element={<UserProfile user = {user} />}></Route>
                      <Route path = "*" element={<Nonexistent />}></Route>
                  </Routes>
              </BrowserRouter>
          </div>
      );
}

export default App;
