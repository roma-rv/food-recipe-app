import MealCardFavorites from './MealCardFavorites';
import './MealFavorites.css'

function MealListFavorites({ dataFavorites, showAdditionalInfo }) {
    return (
        <div className="favorites-grid">
            {dataFavorites.length !== 0 ? (
                dataFavorites.map(meal => (
                    <MealCardFavorites key={meal.idMeal} meal={meal} onOpen={showAdditionalInfo}/>
                ))
            ) : (
                <div className="no-favorites">
                    No meals in favorites
                </div>
            )}
        </div>
    )
}

export default MealListFavorites;