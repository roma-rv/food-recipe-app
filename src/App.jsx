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
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isAdditionalInfo, setIsAdditionalInfo] = useState(false);
    const [chosenCard, setChosenCard] = useState(null);

    function addMeal() {
        if (!newMeal.title) {
            setIsSubmitted(true);
            return;
        }
        if (!newMeal.category) {
            setIsSubmitted(true)
            return;
        }
        if (!newMeal.calories || Number(newMeal.calories) < 0 || isNaN(newMeal.calories)) {
            setIsSubmitted(true)
            return;
        }
        if (!newMeal.url) {
            setIsSubmitted(true)
            return;
        }
        if (!newMeal.recipe) {
            setIsSubmitted(true)
            return;
        }

        const newId = newMealsData[newMealsData.length - 1].id + 1;
        setNewMealsData(prev => [...prev, {...newMeal, id: newId, calories: Number(newMeal.calories)}]);
        setIsButtonClicked(prev => false);
        setIsSubmitted(false);
        setNewMeal(prev => ({
            title: "",
            category: "",
            calories: "",
            url: "",
            recipe: ""
        }));
    }

    function deleteCard(id, e) {
        e.stopPropagation();
        setNewMealsData(prev => prev.filter(meal => meal.id !== id));
    }

    function closeMealForm() {
        setIsSubmitted(false);
        setNewMeal(prev => ({
            title: "",
            category: "",
            calories: "",
            url: "",
            recipe: ""
        }))
        setIsButtonClicked(prev => false);
    }

    function showAdditionalInfo(meal) {
        setIsAdditionalInfo(prev => true);
        setChosenCard(prev => meal);
    }

    function closeRecipeForm() {
        setIsAdditionalInfo(false);
        setChosenCard(prev => (null))
    }

    const uniqueCategory = ["all", ...new Set(newMealsData.map(meal => meal.category))];

    const filterMeals = newMealsData.filter(meal => {
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
                            <input value={newMeal.title} style={{width: "70%", border: isSubmitted && newMeal.title === "" ? "1px solid red" : "1px solid black"}} placeholder='Title' onChange={(e) => setNewMeal(prev => ({...prev, title: e.target.value}))}></input>
                            <input value={newMeal.category} style={{width: "70%", border: isSubmitted && newMeal.category === "" ? "1px solid red" : "1px solid black"}} placeholder='Category' onChange={(e) => setNewMeal(prev => ({...prev, category: e.target.value}))}></input>
                            <input value={newMeal.calories} style={{width: "70%", border: isSubmitted && (!newMeal.calories || Number(newMeal.calories) < 0 || isNaN(newMeal.calories)) ? "1px solid red" : "1px solid black"}} placeholder='Calories' onChange={(e) => setNewMeal(prev => ({...prev, calories: e.target.value}))}></input>
                            <input value={newMeal.url} style={{width: "70%", border: isSubmitted && newMeal.url === "" ? "1px solid red" : "1px solid black"}} placeholder='Url' onChange={(e) => setNewMeal(prev => ({...prev, url: e.target.value}))}></input>
                            <textarea value={newMeal.recipe} style={{width: "70%", border: isSubmitted && newMeal.recipe === "" ? "1px solid red" : "1px solid black"}} placeholder='Recipe' onChange={(e) => setNewMeal(prev => ({...prev, recipe: e.target.value}))}></textarea>
                            <button onClick={() => addMeal()}>Add</button>
                            <button onClick={() => closeMealForm()}>Close</button>
                        </div>
                    ) : ""}
            </div>

            {isAdditionalInfo ? (
                <div style={{width: "1200px", height: "700px", backgroundColor: "green", zIndex: "10", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto 150px", position: "relative" }}>
                    {Array.isArray(chosenCard.recipe) ? (<p>{chosenCard.recipe.map((rec, index) => <span key={index}>{`${index + 1}. ${rec}`}<br></br></span>)}</p>) : <p>{chosenCard.recipe}</p>}
                    <span 
                        onClick={() => closeRecipeForm()}
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "10px",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "black",
                            backgroundColor: "rgba(197, 192, 192, 0.7)",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px", 
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: "2",
                        }}
                    >
                        &times;
                    </span>
                </div>  
            ) : ""}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%', maxWidth: "1200px", boxSizing: 'border-box', margin: "auto 150px" }}>
                {filterMeals.length !== 0 ? (
                    filterMeals.map(meal => (
                        <div key={meal.id} style={{width: "280px", height: "310px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} onClick={() => showAdditionalInfo(meal)}>
                            <span 
                                onClick={(e) => deleteCard(meal.id, e)}
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "10px",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    backgroundColor: "rgba(197, 192, 192, 0.7)",
                                    borderRadius: "50%",
                                    width: "24px",
                                    height: "24px", 
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: "2",
                                }}
                            >
                                &times;
                            </span>
                            <img style={{width: "200px", height: "180px"}} src={meal.url} alt={meal.url} />
                            <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{meal.title}</h1>
                        </div>
                    ))
                ) : "No meals"}
            </div>
        </div>
    )
}

export default App;