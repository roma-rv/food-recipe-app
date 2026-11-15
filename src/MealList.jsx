import MealCard from './MealCard';

function MealList({ filterMeals, showAdditionalInfo, deleteCard}) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', width: '100%', maxWidth: "70%", boxSizing: 'border-box', margin: "0 auto", padding: "0 20px", justifyItems: "center" }}>
            {filterMeals.length !== 0 ? (
                filterMeals.map(meal => (
                    <MealCard key={meal.idMeal} meal={meal} onOpen={showAdditionalInfo} onDelete={deleteCard}/>
                ))
            ) : "No meals"}
        </div>
    )
}

export default MealList;