import {useState, useEffect} from 'react';
import Modal from './Modal'
import MealForm from './MealForm'
import MealInfo from './MealInfo'
import MealList from './MealList'

function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [categoryData, setCategoryData] = useState(() => {
        let isDataLoaded = localStorage.getItem("categories");
        return isDataLoaded ? JSON.parse(isDataLoaded) : null;
    });
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [newMealsData, setNewMealsData] = useState(() => {
        let isDataLoaded = localStorage.getItem("meals");
        return isDataLoaded ? JSON.parse(isDataLoaded) : [];
    });
    const [mealInfo, setMealInfo] = useState(() => {
        let isDataLoaded = localStorage.getItem("mealsInfo");
        return isDataLoaded ? JSON.parse(isDataLoaded) : null;
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [chosenCard, setChosenCard] = useState(null);
    const [loading, setLoading] = useState(() => {
        return !localStorage.getItem("meals");
    });
    const [loadingCategory, setLoadingCategory] = useState(() => {
        return !localStorage.getItem("categories");
    });
    const [error, setError] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => {
        if (categoryData !== null) return;
        
        async function fetchCategories() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const data = await response.json();
                setCategoryData(data.categories);
                localStorage.setItem("categories", JSON.stringify(data.categories));
                setLoadingCategory(false);
                setError(null);
            } catch (error) {
                console.log(error);
                setLoadingCategory(false);
                setError(error.message);
            }
        }

        fetchCategories();

    }, []);
    
    useEffect(() => {
        if (!categoryData || newMealsData.length > 0) return;

        async function fetchMeals() {
            try {
                const results = await Promise.all(categoryData.map(async (category) => {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);
                    
                    if (!response.ok) {
                        throw new Error("Failed to fetch meals");
                    }

                    const data = await response.json();

                    return (data.meals || []).map(meal => ({...meal, strCategory: category.strCategory}));
                }))

                const meals = results.flat();
                
                setNewMealsData(meals);
                localStorage.setItem("meals", JSON.stringify(meals));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMeals();

    }, [categoryData]);

    useEffect(() => {
        if (!chosenCard) return;

        if (chosenCard.isCustom) {
            setMealInfo(chosenCard);
            setLoadingInfo(false);
            setErrorInfo(null);
            return;
        };

        const controller = new AbortController();
        
        setLoadingInfo(true);
        setErrorInfo(null);

        async function showInfo() {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${chosenCard.strMeal}`, {signal: controller.signal});

                console.log(response);

                if (!response.ok) {
                    throw new Error("Failed to fetch meal info");
                }

                const data = await response.json();

                if (!data.meals) {
                    throw new Error("Meal not found");
                }

                setMealInfo(data);
                localStorage.setItem("mealInfoInstructions", JSON.stringify(data.meals[0].strInstructions));
            } catch (error) {
                setErrorInfo(error.message);
            } finally {
                setLoadingInfo(false);
            }
        }

        showInfo();

        return () => {
            controller.abort();
        }

    }, [chosenCard]);

    if (loadingCategory) return <div>Loading categories...</div>;
    if (error) return <div>{error}</div>;
    if (loading) return <div>Loading meals...</div>

    function addMeal(newMeal) {
        if (!newMeal.strArea) {
            setIsSubmitted(true);
            return false;
        }
        if (!newMeal.strCategory) {
            setIsSubmitted(true)
            return false;
        }
        if (!newMeal.strCountry) {
            setIsSubmitted(true)
            return false;
        }
        if (!newMeal.strMeal) {
            setIsSubmitted(true)
            return false;
        }
        if (!newMeal.strInstructions) {
            setIsSubmitted(true)
            return false;
        }

        const newId = Date.now();
        const updatedMealsData = [...newMealsData, {...newMeal, idMeal: String(newId), isCustom: true}]
        setNewMealsData(updatedMealsData);
        setIsButtonClicked(false);
        setIsSubmitted(false);
        localStorage.setItem("meals", JSON.stringify(updatedMealsData));
        return true;
    }

    function deleteCard(id, e) {
        e.stopPropagation();
        const filteredArray = newMealsData.filter(meal => meal.idMeal !== id)
        setNewMealsData(filteredArray);
        localStorage.setItem("meals", JSON.stringify(filteredArray));
    }

    function closeMealForm() {
        setIsSubmitted(false);
        setIsButtonClicked(false);
    }

    function showAdditionalInfo(meal) {
        console.log(meal);
        setChosenCard(meal);
    }

    function closeRecipeForm() {
        setChosenCard(null);
        setMealInfo(null);
        setErrorInfo(null);
    }

    const uniqueCategory = ["All", ...new Set((categoryData || []).map(meal => meal.strCategory))];

    const filterMeals = newMealsData.filter(meal => {
        const matchesCategory = category === "All" || meal.strCategory === category;
        const matchesSearch = meal.strMeal.toLowerCase().includes(search.toLowerCase());
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
                            <MealForm isSubmitted={isSubmitted} addMeal={addMeal} closeMealForm={closeMealForm} />
                        </Modal>
                    ) : null}
            </div>

            {mealInfo ? (
                <Modal>
                    <MealInfo mealInfo={mealInfo} closeRecipeForm={closeRecipeForm} loadingInfo={loadingInfo} />
                </Modal>
            ) : errorInfo}

            <MealList filterMeals={filterMeals} showAdditionalInfo={showAdditionalInfo} deleteCard={deleteCard}/>
        </div>
    )
}

export default App;