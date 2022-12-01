// import logo from "./logo.svg";
// import "./App.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { recipeMealTimeContext } from "../Context";

function Home() {
  const { mealTime, setMealTime } = useContext(recipeMealTimeContext);
  return (
    <div>
      <button onClick={() => setMealTime("Breakfast")}>
        <Link to="/Breakfast">Breakfast</Link>
      </button>
      <button onClick={() => setMealTime("Lunch")}>
        <Link to="/Lunch"> Lunch</Link>
      </button>
      <button onClick={() => setMealTime("Dinner")}>
        <Link to="/Dinner">Dinner</Link>
      </button>
    </div>
  );
}

export default Home;
