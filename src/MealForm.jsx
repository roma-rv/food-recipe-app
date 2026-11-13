import { useState } from 'react';

function MealForm( { isSubmitted, addMeal, closeMealForm }) {
    const [newMeal, setNewMeal] = useState(
        {
            strArea: "",
            strCategory: "",
            strCountry: "",
            strMeal: "",
            strInstructions: ""
        }
    )
    return (
        <>
            <input value={newMeal.strArea} style={{width: "70%", border: isSubmitted && newMeal.strArea === "" ? "1px solid red" : "1px solid black"}} placeholder='Title' onChange={(e) => setNewMeal(prev => ({...prev, strArea: e.target.value}))}></input>
            <input value={newMeal.strCategory} style={{width: "70%", border: isSubmitted && newMeal.strCategory === "" ? "1px solid red" : "1px solid black"}} placeholder='Category' onChange={(e) => setNewMeal(prev => ({...prev, strCategory: e.target.value}))}></input>
            <input value={newMeal.strCountry} style={{width: "70%", border: isSubmitted && newMeal.strCountry === "" ? "1px solid red" : "1px solid black"}} placeholder='Country' onChange={(e) => setNewMeal(prev => ({...prev, strCountry: e.target.value}))}></input>
            <input value={newMeal.strMeal} style={{width: "70%", border: isSubmitted && newMeal.strMeal === "" ? "1px solid red" : "1px solid black"}} placeholder='Meal' onChange={(e) => setNewMeal(prev => ({...prev, strMeal: e.target.value}))}></input>
            <textarea value={newMeal.strInstructions} style={{width: "70%", border: isSubmitted && newMeal.strMealThumb === "" ? "1px solid red" : "1px solid black"}} placeholder='url' onChange={(e) => setNewMeal(prev => ({...prev, strInstructions: e.target.value}))}></textarea>
            <button onClick={() => {
                const success = addMeal(newMeal);
                if (success) {
                    setNewMeal({
                        strArea: "",
                        strCategory: "",
                        strCountry: "",
                        strMeal: "",
                        strInstructions: ""
                    })
                }
            }}>Add</button>
            <button onClick={() => {
                closeMealForm();
                setNewMeal({
                    strArea: "",
                    strCategory: "",
                    strCountry: "",
                    strMeal: "",
                    strInstructions: ""
                });
            }}>Close</button>
        </>
    )
}

export default MealForm;