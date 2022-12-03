// import "./App.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import {
  recipeCalorieContext,
  recipeIdContext,
  recipeNameContext,
} from "../Context";
import { Link } from "react-router-dom";

function App() {
  const [recipe, setRecipe] = useState([]);
  const [mealInput, setMealInput] = useState("");
  const [meal, setMeal] = useState("");
  const { recipeId, setRecipeId } = useContext(recipeIdContext);
  const { recipeName, setRecipeName } = useContext(recipeNameContext);
  const { recipeCalories, setRecipeCalories } =
    useContext(recipeCalorieContext);
  const [calorieInput, setCalorieInput] = useState("");

  // let api_key = "?apiKey=9172aaf2bf104daa84d9e09f6f54a3ed";
  let api_key = "?apiKey=782bba4ef5fd462d81b2102ebb96fe55";
  // let api_key = "?apiKey=76865ec43abf4ed8b775b956dd6dfaf5";
  // let api_key = "?apiKey=b2851b4e879e4d24800357e02da17645";
  // let api_key = "?apiKey=9172aaf2bf104daa84d9e09f6f54a3ed";

  const loadRecipe = async () => {
    axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch" +
          api_key +
          "&query=" +
          mealInput
      )
      .then((response) => {
        setRecipe(response.data.results);
        console.log(recipe);
      });
  };

  const handleChange = (e) => {
    setMealInput(e.target.value);
    console.log(e.target.value);
  };

  const handleCalorieChange = (e) => {
    setCalorieInput(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    setMeal(mealInput);
    setRecipeCalories(calorieInput);
    loadRecipe();
    setMealInput("");
    setCalorieInput("");
  };

  const select = (id, name) => {
    setRecipeId(id);
    setRecipeName(name);
  };

  return (
    <div className="searchBackground">
      <h1 className="title">Search Recipes</h1>
      <div className="searchFeature">
        <input
          className="search"
          placeholder="Calories"
          value={calorieInput}
          onChange={handleCalorieChange}
        />
        <input
          placeholder="Meal Name"
          className="search"
          value={mealInput}
          onChange={handleChange}
        />
        <button className="enterButton" onClick={submit}>
          Enter
        </button>
      </div>
      <div className="searchBorder">
        {recipe.map((recipe) => (
          <div className="searchRecipeInfo">
            <img style={{ height: 250, width: 250 }} src={recipe.image}></img>
            <div className="recipeNameWrapper">
              <button
                className="selectRecipe"
                key={recipe.id}
                onClick={() => select(recipe.id, recipe.title)}
              >
                <Link className="searchRecipeName" to="/RecipeInstructions">
                  {" "}
                  {recipe.title}
                </Link>
              </button>
            </div>
          </div>
        ))}
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
  );
}

export default App;
