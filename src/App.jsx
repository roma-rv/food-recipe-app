import {useState, useEffect} from 'react';
import MealCard from './MealCard'
import Modal from './Modal'
import MealForm from './MealForm'
import MealInfo from './MealInfo'

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [categoryData, setCategoryData] = useState([]);
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
    const [newMealsData, setNewMealsData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [chosenCard, setChosenCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
        .then(response => response.json())
        .then(data => {   
            setCategoryData(data.categories);
        });
    }, []);

    useEffect(() => {
        if (categoryData.length === 0) {
            return;
        }

        Promise.all(categoryData.map(category => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
            .then(response => response.json())
            .then(data => (data.meals || []).map(meal => ({...meal, strCategory: category.strCategory})))    
        )).then(results => {
            setNewMealsData(results.flat());
            setLoading(false);
        });

    }, [categoryData]);

    if (loading) return <div>Loading list...</div>;

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
        setNewMealsData(prev => prev.filter(meal => meal.idMeal !== id));
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

    const uniqueCategory = ["All", ...new Set(categoryData.map(meal => meal.strCategory))];

    const filterMeals = newMealsData.filter(meal => {
        const matchesCategory = category === "All" || meal.strCategory === category;
        const matchesSearch = meal.strMeal.toLowerCase().startsWith(search.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div>
                <input style={{width: "70%", height: "20px", margin: "0 auto", padding: "0 20px" }} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {uniqueCategory.map(category => (
                        <option key={category} value={category}>{category}</option>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', width: '100%', maxWidth: "1200px", boxSizing: 'border-box', margin: "0 auto", padding: "0 20px" }}>
                {filterMeals.length !== 0 ? (
                    filterMeals.map(meal => (
                        <MealCard key={meal.idMeal} meal={meal} onOpen = {showAdditionalInfo} onDelete = {deleteCard}/>
                    ))
                ) : "No meals"}
            </div>
        </div>
    )
}

export default App;