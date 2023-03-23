import React from "react";

//GlobalStyle
import GlobalStyle from "./components/GlobalStyle";

//React Router DOM
import { Routes, Route, Navigate } from "react-router-dom";

//components
import Nav from "./components/Nav";
import Home from "./pages/Home";
import BusStopsList from "./pages/BusStopsList";
import BusStop from "./pages/BusStop";

function App() {
  console.log(process.env);
  return (
    <div className="App">
      <GlobalStyle />
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/busstopslist" element={<BusStopsList />} />
        <Route path="/busstopslist/:id" element={<BusStop />} />
        <Route path="*" element={<Navigate to="/busstopslist" />} />
      </Routes>
    </div>
  );
}

export default App;
