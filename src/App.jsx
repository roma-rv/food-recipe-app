import {useState} from 'react';
import { mealsData } from './mealsData';
import MealCard from './MealCard'
import Modal from './Modal'
import MealForm from './MealForm'
import MealInfo from './MealInfo'

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

        const newId = newMealsData.length > 0 ? newMealsData[newMealsData.length - 1].id + 1 : 0;
        setNewMealsData(prev => [...prev, {...newMeal, id: newId, calories: Number(newMeal.calories)}]);
        setIsButtonClicked(false);
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
        setIsButtonClicked(false);
    }

    function showAdditionalInfo(meal) {
        setChosenCard(meal);
    }

    function closeRecipeForm() {
        setChosenCard(null);
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
                        <Modal>
                            <MealForm newMeal={newMeal} isSubmitted={isSubmitted} setNewMeal={setNewMeal} addMeal={addMeal} closeMealForm={closeMealForm} />
                        </Modal>
                    ) : null}
            </div>

            {chosenCard ? (
                <Modal>
                    <MealInfo recipe={chosenCard.recipe} closeRecipeForm={closeRecipeForm} />
                </Modal>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', width: '100%', maxWidth: "1200px", boxSizing: 'border-box', margin: "auto 150px" }}>
                {filterMeals.length !== 0 ? (
                    filterMeals.map(meal => (
                        <MealCard key={meal.id} meal={meal} onOpen = {showAdditionalInfo} onDelete = {deleteCard}/>
                    ))
                ) : "No meals"}
            </div>
        </div>
    )
}

export default App;