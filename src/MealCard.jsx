function MealCard({ meal, onOpen, onDelete}) {
    return (
        <div style={{width: "280px", height: "310px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} onClick={() => onOpen(meal)}>
            <span 
                onClick={(e) => onDelete(meal.id, e)}
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
            <img style={{width: "200px", height: "180px"}} src={meal.url} alt={meal.url} />
            <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{meal.title}</h1>
        </div>
    )
}

export default MealCard;