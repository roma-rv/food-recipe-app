import {useState, useEffect} from 'react';
import MealCard from './MealCard'
import Modal from './Modal'
import MealForm from './MealForm'
import MealInfo from './MealInfo'

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [categoryData, setCategoryData] = useState(() => {
        let isDataLoaded = localStorage.getItem("categories");
        return isDataLoaded ? JSON.parse(isDataLoaded) : null;
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [newMeal, setNewMeal] = useState(
        {
            strArea: "",
            strCategory: "",
            strCountry: "",
            strMeal: "",
            strMealThumb: ""
        }
    )
    const [newMealsData, setNewMealsData] = useState(() => {
        let isDataLoaded = localStorage.getItem("meals");
        return isDataLoaded ? JSON.parse(isDataLoaded) : [];
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [chosenCard, setChosenCard] = useState(null);
    const [loading, setLoading] = useState(() => {
        return !localStorage.getItem("meals");
    });

    useEffect(() => {
        if (categoryData !== null) return;
        
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
        .then(response => response.json())
        .then(data => {   
            setCategoryData(data.categories);
            localStorage.setItem("categories", JSON.stringify(data.categories));
            // console.log(data.categories);
        });

    }, []);
    
    console.log(categoryData);
    
    useEffect(() => {
        if (!categoryData || newMealsData.length > 0) return;

        Promise.all(categoryData.map(category => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
            .then(response => response.json())
            .then(data => (data.meals || []).map(meal => ({...meal, strCategory: category.strCategory})))    
        )).then(results => {
            setNewMealsData(results.flat());
            setLoading(false);
            localStorage.setItem("meals", JSON.stringify(results.flat()));
        });

    }, [categoryData]);

    console.log(newMealsData);

    if (loading) return <div>Loading list...</div>;

    function addMeal() {
        if (!newMeal.strArea) {
            setIsSubmitted(true);
            return;
        }
        if (!newMeal.strCategory) {
            setIsSubmitted(true)
            return;
        }
        if (!newMeal.strCountry) {
            setIsSubmitted(true)
            return;
        }
        if (!newMeal.strMeal) {
            setIsSubmitted(true)
            return;
        }
        if (!newMeal.strMealThumb) {
            setIsSubmitted(true)
            return;
        }

        const newId = newMealsData.length > 0 ? newMealsData[newMealsData.length - 1].idMeal + 1 : 0;
        const updatedMealsData = [...newMealsData, {...newMeal, id: newId}]
        setNewMealsData(updatedMealsData);
        setIsButtonClicked(false);
        setIsSubmitted(false);
        setNewMeal(prev => ({
            strArea: "",
            strCategory: "",
            strCountry: "",
            strMeal: "",
            strMealThumb: ""
        }));
        localStorage.setItem("meals", JSON.stringify(updatedMealsData));
    }

    function deleteCard(id, e) {
        e.stopPropagation();
        const filteredArray = newMealsData.filter(meal => meal.idMeal !== id)
        setNewMealsData(filteredArray);
        localStorage.setItem("meals", JSON.stringify(filteredArray));
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

    const filterMeals = newMealsData.slice(0, 10).filter(meal => {
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