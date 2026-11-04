import {useState} from 'react';

function MealCard({ meal, onOpen, onDelete}) {
    const [isHovered, setIsHovered] = useState(false);

    const glowColor = '#41b334';

    return (
        <div style={{width: "250px", height: "310px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", transition: "all 0.3s ease", boxShadow: isHovered ? `0 0 20px 5px ${glowColor}` : 'none', border: isHovered ? `1px solid ${glowColor}` : '1px solid transparent', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden'}} onClick={() => onOpen(meal)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <span 
                onClick={(e) => onDelete(meal.idMeal, e)}
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
            <img style={{width: "100%", height: "180px", objectFir: "covers", display: "block", borderRadius: "10px"}} src={meal.strMealThumb} alt={meal.strMealThumb} />
            <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{meal.strMeal}</h1>
        </div>
    )
}

export default MealCard;