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
  // let api_key = process.env.api_key;
  let api_key = "?apiKey=9172aaf2bf104daa84d9e09f6f54a3ed";
  const [instructions, setInstructions] = useState([]);
  const [calories, setCalories] = useState("");
  const { recipeId, setRecipeId } = useContext(recipeIdContext);
  const { recipeName, setRecipeName } = useContext(recipeNameContext);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const { recipeCalories, setRecipeCalories } =
    useContext(recipeCalorieContext);
  const { mealTime, setMealTime } = useContext(recipeMealTimeContext);

  const displayInstructions = () => {
    console.log("ehll");
    console.log(recipeId);
    axios
      .get(
        "https://api.spoonacular.com/recipes/" +
          recipeId +
          "/analyzedInstructions" +
          api_key
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data[0].steps);
        let steps = response.data[0].steps;
        setInstructions(steps);
        console.log(instructions);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json${api_key}`
      )
      .then((response) => {
        console.log(response.data.ingredients);
        setRecipeIngredients(response.data.ingredients);
        console.log(recipeIngredients);
      });

    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json${api_key}`
      )
      .then((response) => {
        // console.log(response.data.calories);
        setCalories(response.data.calories);
        console.log(calories);
      });
  };

  const save = () => {
    console.log(instructions);
    console.log(recipeCalories);
    console.log(recipeIngredients);
    console.log(calories);
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
    // console.log(recipeId);
  }, []);

  return (
    <div>
      <h3>Ingredients</h3>
      <h5>
        {recipeIngredients.map((ingredient) => (
          <div key={ingredient.name}>
            {ingredient.name}
            &nbsp;
            {ingredient.amount.metric.value}
            &nbsp;
            {ingredient.amount.metric.unit}
          </div>
        ))}
      </h5>
      <h3>Instructions</h3>
      <h5>
        {instructions.map((instruction) => (
          <div key={instruction.number}>
            {instruction.number} {instruction.step}
          </div>
        ))}
      </h5>
      <button onClick={save}>save</button>
      <button>
        <Link to="/SearchRecipes"> Back to Search </Link>
      </button>
      <button>
        <Link to="/"> Home</Link>
      </button>
    </div>
  );
}

export default RecipeInstructions;
