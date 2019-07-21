import React,{useEffect,useState} from 'react';
import './App.css';
import RecipeComponent from './Recipe';

function App() {
  // const APP_ID = "3a2740fb";
  // const APP_KEY = "b1d2dce932f6e2863603451bb42df17c";
  const APP_ID = "4ece3942";
  const  APP_KEY = "14a8bc6d6966363fcb94118700646fde";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana');

  useEffect(() => {
    console.log("Effect run!!");
    getRecipes();
  },[query]);

 const getRecipes = async () => {
    const response = await fetch( 
      `https://api.edamam.com/search?q=banana&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data =await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e =>{
   e.preventDefault();
   setQuery(search);
   setSearch('');
  };

  return (
    <div className="App">
      <h1>Welcome</h1>
     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" type="text"  value={search} onChange={updateSearch}/>
       <button className="search-button" type="submit">Search</button>
     </form>
     <div className="Recipe">
     {recipes.map(recipe =>(
       <RecipeComponent
       label={recipe.recipe.label}
       title = {recipe.recipe.label} 
       calories = {recipe.recipe.calories}
       image = {recipe.recipe.image} 
       ingredients = {recipe.recipe.ingredients}
       />
     ))}
     </div>
    </div>
  );
}

export default App;
