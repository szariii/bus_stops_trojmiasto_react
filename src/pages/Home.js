import React from "react";

//React Router DOM
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Home</p>

      <button onClick={() => navigate("/busstopslist")}>Bus stops list</button>
    </div>
  );
};

export default Home;
