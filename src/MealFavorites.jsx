function MealFavorites({ closeFavorites }) {
    return (
        <>  
            <h1>Favorites</h1>
            <span 
                onClick={() => closeFavorites()}
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

export default MealFavorites;