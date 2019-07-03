import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID = "3a2740fb";
  const APP_KEY = "b1d2dce932f6e2863603451bb42df17c	—";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');

  useEffect(() => {
    console.log("Effect run!!");
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch('https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free');
    const data = response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (event) =>{
   event.preventDefault();
   setQuery(search);
   setSearch('');
  };

  return (
    <div className="App">
     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" type="text" />
       <button className="search-button" type="submit" type={search} onChange={updateSearch}>Search</button>
     </form>
     <div className="Recipie">
     {recipes.map(recipe =>(
       <Recipe
       key={recipe.recipe.label}
       title = {recipe.recipe.label} calories = {recipe.recipe.calories}
       image = {recipe.recipe.image} 
       ingredients = {recipe.recipe.ingredients}
       />
     ))}
     </div>
    </div>
  );
}

export default App;
