import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SearchRecipe from "./pages/SearchRecipe.js";
import RecipeInstructions from "./pages/RecipeInstructions.js";
import Breakfast from "./pages/Breakfast.js";
import Lunch from "./pages/Lunch.js";
import Dinner from "./pages/Dinner.js";
import {
  recipeIdContext,
  recipeNameContext,
  recipeCalorieContext,
  recipeMealTimeContext,
} from "./Context";
import { useState } from "react";

function App() {
  const [recipeId, setRecipeId] = useState("654959");
  const [recipeName, setRecipeName] = useState("Name");
  const [mealTime, setMealTime] = useState("Time");
  const [recipeCalories, setRecipeCalories] = useState(0);
  return (
    <recipeMealTimeContext.Provider value={{ mealTime, setMealTime }}>
      <recipeCalorieContext.Provider
        value={{ recipeCalories, setRecipeCalories }}
      >
        <recipeNameContext.Provider value={{ recipeName, setRecipeName }}>
          <recipeIdContext.Provider value={{ recipeId, setRecipeId }}>
            <Router>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/searchRecipes" element={<SearchRecipe />} />
                <Route
                  exact
                  path="/recipeInstructions"
                  element={<RecipeInstructions />}
                />
                <Route exact path="/Breakfast" element={<Breakfast />} />
                <Route exact path="/Lunch" element={<Lunch />} />
                <Route exact path="/Dinner" element={<Dinner />} />
              </Routes>
            </Router>
          </recipeIdContext.Provider>
        </recipeNameContext.Provider>
      </recipeCalorieContext.Provider>
    </recipeMealTimeContext.Provider>
  );
}

export default App;
