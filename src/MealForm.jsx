function MealForm( { newMeal, isSubmitted, setNewMeal, addMeal, closeMealForm }) {
    return (
        <>
            <input value={newMeal.title} style={{width: "70%", border: isSubmitted && newMeal.title === "" ? "1px solid red" : "1px solid black"}} placeholder='Title' onChange={(e) => setNewMeal(prev => ({...prev, title: e.target.value}))}></input>
            <input value={newMeal.category} style={{width: "70%", border: isSubmitted && newMeal.category === "" ? "1px solid red" : "1px solid black"}} placeholder='Category' onChange={(e) => setNewMeal(prev => ({...prev, category: e.target.value}))}></input>
            <input value={newMeal.calories} style={{width: "70%", border: isSubmitted && (!newMeal.calories || Number(newMeal.calories) < 0 || isNaN(newMeal.calories)) ? "1px solid red" : "1px solid black"}} placeholder='Calories' onChange={(e) => setNewMeal(prev => ({...prev, calories: e.target.value}))}></input>
            <input value={newMeal.url} style={{width: "70%", border: isSubmitted && newMeal.url === "" ? "1px solid red" : "1px solid black"}} placeholder='Url' onChange={(e) => setNewMeal(prev => ({...prev, url: e.target.value}))}></input>
            <textarea value={newMeal.recipe} style={{width: "70%", border: isSubmitted && newMeal.recipe === "" ? "1px solid red" : "1px solid black"}} placeholder='Recipe' onChange={(e) => setNewMeal(prev => ({...prev, recipe: e.target.value}))}></textarea>
            <button onClick={() => addMeal()}>Add</button>
            <button onClick={() => closeMealForm()}>Close</button>
        </>
    )
}

export default MealForm;