import "../App.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { recipeMealTimeContext } from "../Context";
import ramen from "../images/ramen.png";

function Home() {
  const { mealTime, setMealTime } = useContext(recipeMealTimeContext);
  return (
    <div className="background">
      <div className="border">
        <h1 className="title">ZEROFOODWASTE</h1>
        <img src={ramen} style={{ height: 300, width: 300 }}></img>
        <div className="buttons">
          <div className="buttonWrapper">
            <button className="button" onClick={() => setMealTime("Breakfast")}>
              <Link className="buttonText" to="/Breakfast">
                Breakfast
              </Link>
            </button>
          </div>
          <div className="buttonWrapper">
            <button className="button" onClick={() => setMealTime("Lunch")}>
              <Link className="buttonText" to="/Lunch">
                Lunch
              </Link>
            </button>
          </div>
          <div className="buttonWrapper">
            <button className="button" onClick={() => setMealTime("Dinner")}>
              <Link className="buttonText" to="/Dinner">
                Dinner
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
