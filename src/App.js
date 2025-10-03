import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./context/noteState.js";
import Alert from "./components/Alert.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <div>
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className='container'>
              <Routes>
                <Route
                  exact
                  path='/'
                  element={<Home showAlert={showAlert} />}
                ></Route>
                <Route exact path='/about' element={<About />}></Route>
                <Route
                  exact
                  path='/login'
                  element={<Login showAlert={showAlert} />}
                ></Route>
                <Route
                  exact
                  path='/signup'
                  element={<Signup showAlert={showAlert} />}
                ></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
