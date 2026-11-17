function Favorite({ openFavorites, totalCount }) {
    return (
        <div style={{
                position: "fixed",
                display: "inline-block",
                margin: "0 auto",
                left: "90%",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: "60px",
                height: "60px",
                zIndex: "10"
            }}
            onClick={() => openFavorites(true)}
            >
            <img src='https://cdn-icons-png.flaticon.com/512/70/70669.png'
                style={{
                    width: "40px",
                    height: "40px"
                }}
            />
            <span style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                backgroundColor: "#ff3b30",
                color: '#fff',
                fontSize: '15px',
                fontWeight: 'bold',
                padding: '0 4px',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1
            }}>{totalCount}</span>
        </div>
    )
}

export default Favorite;