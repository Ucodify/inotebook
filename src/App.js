import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./context/noteState.js";
import Alert from "./components/Alert.js";

function App() {
  return (
    <>
      <div>
        <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <div className='container'>
              <Routes>
                <Route exact path='/' element={<Home />}></Route>
                <Route exact path='/about' element={<About />}></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
