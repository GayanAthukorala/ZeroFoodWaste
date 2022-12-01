// import logo from "./logo.svg";
// import "./App.css";
import React, { useEffect, useState, useRef, useContext } from "react";
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
  // const [recipeId, setRecipeId] = useState("");
  const { recipeId, setRecipeId } = useContext(recipeIdContext);
  const { recipeName, setRecipeName } = useContext(recipeNameContext);
  const { recipeCalories, setRecipeCalories } =
    useContext(recipeCalorieContext);
  const [calorieInput, setCalorieInput] = useState("");
  let formRef = useRef();
  // let api_key = process.env.api_key;
  let api_key = "?apiKey=9172aaf2bf104daa84d9e09f6f54a3ed";
  const loadRecipe = async () => {
    // fetch("https://www.boredapi.com/api/activity")

    axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch" +
          api_key +
          "&query=" +
          mealInput
      )
      .then((response) => {
        setRecipe(response.data.results);
        // console.log(response);
        // console.log(response.data);
        console.log(recipe);
      });
  };

  // useEffect(() => {
  //   loadRecipe();
  // }, []);

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
    console.log(meal);
    formRef.current?.reset();
    loadRecipe();
    setMealInput("");
  };

  const select = (id, name) => {
    console.log(name);
    setRecipeId(id);
    console.log(recipeId);
    setRecipeName(name);
    console.log(recipeName);
  };

  return (
    <div>
      <h3>
        {recipe.map((recipe) => (
          <div>
            <button
              key={recipe.id}
              onClick={() => select(recipe.id, recipe.title)}
            >
              <Link to="/RecipeInstructions"> {recipe.title}</Link>
            </button>
            <h4>{recipeId}</h4>
          </div>
        ))}
      </h3>
      {/* <h3>{meal}</h3> */}
      <input value={calorieInput} onChange={handleCalorieChange} />
      <input value={mealInput} onChange={handleChange} />
      <button onClick={submit}>Enter</button>
      <button>
        <Link to="/"> Home</Link>
      </button>
    </div>
  );
}

export default App;
