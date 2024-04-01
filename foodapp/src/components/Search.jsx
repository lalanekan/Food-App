import React, { useEffect, useState } from "react";
import styles from "./search.module.css";


const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "ab979b5617f345f09cda786bf8056cea";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("Pizza");
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
      ></input>
    </div>
  );
}
