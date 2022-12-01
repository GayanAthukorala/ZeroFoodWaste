// import logo from "./logo.svg";
// import "./App.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { recipeMealTimeContext } from "../Context";
import axios from "axios";
// import { load } from "npm";
// import { load } from "npm";

function Breakfast() {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { mealTime, setMealTime } = useContext(recipeMealTimeContext);

  const loadMeals = async () => {
    // fetch("https://www.boredapi.com/api/activity")

    axios.get("http://localhost:8000/meals/").then((response) => {
      console.log(response.data);
      setMeals(response.data);
      // console.log(response.data);
    });
  };

  const removeMeal = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`http://localhost:8000/meals/${id}`)
        .then((response) => {
          console.log(response);
          loadMeals();
          console.log(meals);
        });
    } catch {
      console.log("error");
      loadMeals();
    }
  };

  useEffect(() => {
    loadMeals();
    // console.log(recipeId);
  }, []);
  return (
    <div>
      <h1>Dinner Meals</h1>
      <div>
        {meals.map((meal) => (
          <div>
            {meal.mealTime == "Dinner" ? (
              <div key={meal.id}>
                <h2>{meal.name}</h2>
                <h3>Ingredients</h3>
                {meal.ingredients.map((ingredient) => (
                  <h5 key={ingredient.name}>
                    {ingredient.name}
                    &nbsp;
                    {ingredient.amount.metric.value}
                    &nbsp;
                    {ingredient.amount.metric.unit}
                  </h5>
                ))}
                <h3>Instructions</h3>
                {meal.instructions.map((step) => (
                  <h5 key={step.number}> {step.step}</h5>
                ))}
                <button
                  onClick={() => {
                    removeMeal(meal.id);
                  }}
                >
                  delete
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
      <button>
        <Link to="/SearchRecipes"> Add Recipe</Link>
      </button>
      <button>
        <Link to="/"> Home</Link>
      </button>
    </div>
  );
}

export default Breakfast;
