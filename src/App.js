import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "./components/Home";
import WriteBook from "./components/WriteBook";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/write' element={<WriteBook/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
