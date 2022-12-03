import React, { useEffect, useState, useRef, useContext } from "react";
import {
  recipeIdContext,
  recipeIngredientContext,
  recipeNameContext,
  recipeCalorieContext,
  recipeMealTimeContext,
} from "../Context";
import axios from "axios";
import { Link } from "react-router-dom";

function RecipeInstructions() {
  // let api_key = "?apiKey=9172aaf2bf104daa84d9e09f6f54a3ed";
  let api_key = "?apiKey=782bba4ef5fd462d81b2102ebb96fe55";
  // let api_key = "?apiKey=76865ec43abf4ed8b775b956dd6dfaf5";
  // let api_key = "?apiKey=b2851b4e879e4d24800357e02da17645";
  // let api_key = "?apiKey=9172aaf2bf104daa84d9e09f6f54a3ed";
  const [instructions, setInstructions] = useState([]);
  const [calories, setCalories] = useState("");
  const { recipeId, setRecipeId } = useContext(recipeIdContext);
  const { recipeName, setRecipeName } = useContext(recipeNameContext);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const { recipeCalories, setRecipeCalories } =
    useContext(recipeCalorieContext);
  const { mealTime, setMealTime } = useContext(recipeMealTimeContext);

  const displayInstructions = () => {
    axios
      .get(
        "https://api.spoonacular.com/recipes/" +
          recipeId +
          "/analyzedInstructions" +
          api_key
      )
      .then((response) => {
        let steps = response.data[0].steps;
        setInstructions(steps);
        console.log(response);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json${api_key}`
      )
      .then((response) => {
        setRecipeIngredients(response.data.ingredients);
        console.log(recipeIngredients);
      });

    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json${api_key}`
      )
      .then((response) => {
        setCalories(response.data.calories);
      });
  };

  const save = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/meals/",
      data: {
        name: recipeName,
        instructions: instructions,
        calories: calories,
        ingredients: recipeIngredients,
        desiredCalories: recipeCalories,
        mealTime: mealTime,
      },
    });
  };
  useEffect(() => {
    displayInstructions();
  }, []);

  return (
    <div className="searchBackground">
      <h1 className="title">Recipe Details</h1>
      <div className="detailsBorder">
        <h2 className="selectRecipeName">{recipeName}</h2>
        <div className="detailsInfo">
          <div className="align">
            <h3 className="detailsRecipeTitle">Ingredients</h3>
            <div className="detailsBox">
              <h5>
                {recipeIngredients.map((ingredient) => (
                  <li
                    className="instructionInfo detailsText"
                    key={ingredient.name}
                  >
                    {ingredient.name}
                    &nbsp;
                    {ingredient.amount.metric.value}
                    &nbsp;
                    {ingredient.amount.metric.unit}
                  </li>
                ))}
              </h5>
            </div>
          </div>
          <div className="align">
            <h3 className="detailsRecipeTitle">Instructions</h3>
            <div className="detailsBox">
              <h5>
                {instructions.map((instruction) => (
                  <li
                    className="instructionInfo detailsText"
                    type="1"
                    key={instruction.number}
                  >
                    {instruction.step}
                  </li>
                ))}
              </h5>
            </div>
          </div>
        </div>
        <div className="saveButtonWrapper">
          <button className="saveButton" onClick={save}>
            <div>Save</div>
          </button>
        </div>
      </div>
      <div className="buttons">
        <div className="buttonWrapper">
          <button className="button">
            <Link className="buttonText" to="/SearchRecipes">
              {" "}
              Back to Search{" "}
            </Link>
          </button>
        </div>
        <div className="buttonWrapper">
          <button className="button">
            <Link className="buttonText" to="/">
              {" "}
              Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeInstructions;
