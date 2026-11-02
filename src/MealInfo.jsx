function MealInfo({ recipe, closeRecipeForm }) {
    return (
        <>
            {Array.isArray(recipe) ? (<p>{recipe.map((rec, index) => <span key={index}>{`${index + 1}. ${rec}`}<br></br></span>)}</p>) : <p>{recipe}</p>}
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