import {useState} from 'react';
import { mealsData } from './mealsData';

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const uniqueCategory = ["all", ...new Set(mealsData.map(meal => meal.category))];

    const filterMeals = mealsData.filter(meal => {
        const matchesCategory = category === "all" || meal.category === category;

        const matchesSearch = meal.title.toLowerCase().startsWith(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });
    
    console.log(category);

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