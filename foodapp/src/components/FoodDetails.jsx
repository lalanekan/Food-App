import React, { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "ab979b5617f345f09cda786bf8056cea";

  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFoodDetails() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFoodDetails();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        {/* Food Details {foodId} */}
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} />
        <div className={styles.recipeDetails}>
          <span>
            <strong>🕓{food.readyInMinutes}Minutes</strong>
          </span>
          <span><strong>{food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}</strong></span>
          <span><strong>👨🏻‍👩🏻‍👦🏻‍👦🏻 Serves {food.servings}</strong></span>
          <span><strong>{food.vegan ? "🐮 Vegan" : ""}</strong></span>
        </div>
        <div>
          $<span>{food.pricePerServing / 100} per serving</span>
        </div>
      </div>
      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />

      <h2>Instuctions</h2>
      <div  className={styles.recipeInstructions}>
        <ol>
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            food.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}
