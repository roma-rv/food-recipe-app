function MealForm( { newMeal, isSubmitted, setNewMeal, addMeal, closeMealForm }) {
    return (
        <>
            <input value={newMeal.strArea} style={{width: "70%", border: isSubmitted && newMeal.strArea === "" ? "1px solid red" : "1px solid black"}} placeholder='Title' onChange={(e) => setNewMeal(prev => ({...prev, strArea: e.target.value}))}></input>
            <input value={newMeal.strCategory} style={{width: "70%", border: isSubmitted && newMeal.strCategory === "" ? "1px solid red" : "1px solid black"}} placeholder='Category' onChange={(e) => setNewMeal(prev => ({...prev, strCategory: e.target.value}))}></input>
            <input value={newMeal.strCountry} style={{width: "70%", border: isSubmitted && newMeal.strCountry === "" ? "1px solid red" : "1px solid black"}} placeholder='Country' onChange={(e) => setNewMeal(prev => ({...prev, strCountry: e.target.value}))}></input>
            <input value={newMeal.strMeal} style={{width: "70%", border: isSubmitted && newMeal.strMeal === "" ? "1px solid red" : "1px solid black"}} placeholder='Meal' onChange={(e) => setNewMeal(prev => ({...prev, strMeal: e.target.value}))}></input>
            <textarea value={newMeal.strMealThumb} style={{width: "70%", border: isSubmitted && newMeal.strMealThumb === "" ? "1px solid red" : "1px solid black"}} placeholder='url' onChange={(e) => setNewMeal(prev => ({...prev, strMealThumb: e.target.value}))}></textarea>
            <button onClick={() => addMeal()}>Add</button>
            <button onClick={() => closeMealForm()}>Close</button>
        </>
    )
}

export default MealForm;