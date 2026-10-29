import {useState} from 'react';
import { mealsData } from './mealsData';

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [newMeal, setNewMeal] = useState(
        {
            title: "",
            category: "",
            calories: "",
            url: "",
            recipe: ""
        }
    )
    const [newMealsData, setNewMealsData] = useState(mealsData);

    console.log(newMealsData);

    function addMeal() {
        const newId = newMealsData[newMealsData.length - 1].id + 1;
        setNewMealsData(prev => [...prev, {...newMeal, id: newId}]);
        setIsButtonClicked(prev => false);
        setNewMeal(prev => ({
            title: "",
            category: "",
            calories: "",
            url: "",
            recipe: ""
        }))
    }

    const uniqueCategory = ["all", ...new Set(mealsData.map(meal => meal.category))];

    const filterMeals = mealsData.filter(meal => {
        const matchesCategory = category === "all" || meal.category === category;

        const matchesSearch = meal.title.toLowerCase().startsWith(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <div>
                <input style={{width: "70%", height: "20px", margin: "auto 150px 40px"}} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {uniqueCategory.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={() => setIsButtonClicked(prev => true)}>Add recipe</button>
                    {isButtonClicked ? (
                        <div style={{width: "1200px", height: "700px", backgroundColor: "green", zIndex: "10", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto 150px" }}>
                            <input style={{width: "70%"}} placeholder='Title' onChange={(e) => setNewMeal(prev => ({...prev, title: e.target.value}))}></input>
                            <input style={{width: "70%"}} placeholder='Category' onChange={(e) => setNewMeal(prev => ({...prev, category: e.target.value}))}></input>
                            <input style={{width: "70%"}} placeholder='Calories' onChange={(e) => setNewMeal(prev => ({...prev, calories: e.target.value}))}></input>
                            <input style={{width: "70%"}} placeholder='Url' onChange={(e) => setNewMeal(prev => ({...prev, url: e.target.value}))}></input>
                            <textarea style={{width: "70%"}} placeholder='Recipe' onChange={(e) => setNewMeal(prev => ({...prev, recipe: e.target.value}))}></textarea>
                            <button onClick={() => addMeal()}>Add</button>
                            <button onClick={() => setIsButtonClicked(prev => false)}>Close</button>
                        </div>
                    ) : ""}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%', maxWidth: "1200px", boxSizing: 'border-box', margin: "auto 150px" }}>
                {filterMeals.length !== 0 ? (
                    filterMeals.map(meal => (
                        <div key={meal.id} style={{width: "200px", height: "400px"}}>
                            <img style={{width: "200px", height: "200px"}} src={meal.url} alt={meal.url} />
                            <h1>{meal.title}</h1>
                        </div>
                    ))
                ) : "No meals"}
            </div>
        </div>
    )
}

export default App;