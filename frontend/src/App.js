import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Landing from "./pages/Landing";
import Main from "./pages/Main";
import Nonexistent from "./pages/Nonexistent";
import Navbar from "./components/Navbar";
import Publish from "./pages/Publish";


// style = {{backgroundImage: "url('/bg.jpg')"}}

function App() {
      return (
          <div className = "vh-100 m-0 overflow-hidden" style={{backgroundColor: "#2A2A2A"}}>
              <BrowserRouter>
                  <Navbar></Navbar>
                  <Routes>
                      <Route path = "/" element={<Landing />}></Route>
                      <Route path = "/stories" element={<Main />}></Route>
                      <Route path = "/publish" element={<Publish />}></Route>
                      <Route path = "*" element={<Nonexistent />}></Route>
                  </Routes>
              </BrowserRouter>
          </div>
      );
}

export default App;
