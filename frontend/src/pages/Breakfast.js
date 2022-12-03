import "../App.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { recipeMealTimeContext } from "../Context";

function Breakfast() {
  const [meals, setMeals] = useState([]);
  const [ingredientToggle, setIngredientToggle] = useState(true);
  const [instructionToggle, setInstructionToggle] = useState(false);
  const loadMeals = async () => {
    axios.get("http://localhost:8000/meals/").then((response) => {
      setMeals(response.data);
    });
  };

  const removeMeal = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/meals/${id}`)
        .then((response) => {
          loadMeals();
        });
    } catch {
      loadMeals();
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);
  return (
    <div className="planMealBackground">
      <h1 className="title">Breakfast Meals</h1>
      <div className="recipeBorder">
        {meals.map((meal) => (
          <div>
            {meal.mealTime == "Breakfast" ? (
              <div className="plannedRecipeBorderGap">
                <div className="align">
                  <div className="plannedRecipeBorder">
                    <div className="plannedRecipeInfo" key={meal.id}>
                      <div className="plannedRecipeTitle">
                        <h2 className="recipeName">{meal.name}</h2>
                        <h3 className="recipeTitle">INGREDIENTS</h3>
                      </div>
                      <div>
                        {meal.ingredients.map((ingredient) => (
                          <li className="instructionInfo" key={ingredient.name}>
                            {ingredient.name}
                            &nbsp;
                            {ingredient.amount.metric.value}
                            &nbsp;
                            {ingredient.amount.metric.unit}
                          </li>
                        ))}
                      </div>
                      <h3 className="recipeTitle">INSTRUCTIONS</h3>
                      <div>
                        {meal.instructions.map((step) => (
                          <li
                            className="instructionInfo"
                            type="1"
                            key={step.number}
                          >
                            {step.step}{" "}
                          </li>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="deleteButtonWrapper">
                    <button
                      onClick={() => {
                        removeMeal(meal.id);
                      }}
                      className="deleteButton"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
      <div className="buttons">
        <div className="buttonWrapper">
          <button className="button">
            <Link className="buttonText" to="/">
              {" "}
              Home
            </Link>
          </button>
        </div>
        <div className="buttonWrapper">
          <button className="button">
            <Link className="buttonText" to="/SearchRecipes">
              Add Recipe
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Breakfast;
