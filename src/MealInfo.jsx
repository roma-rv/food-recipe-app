function MealInfo({ mealInfo, closeRecipeForm, loadingInfo }) {
    console.log(mealInfo);
    return (
        <>
            <h1>{mealInfo.isCustom ? mealInfo.strMeal : (loadingInfo ? "Downloading" : mealInfo.meals[0].strMeal)}</h1>
            <p>{mealInfo.isCustom ? mealInfo.strInstructions : (loadingInfo ? "Downloading" : mealInfo.meals[0].strInstructions)}</p>
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
        </>
    )
}

export default MealInfo;