function Modal({ children }) {
    return (
        <div style={{width: "1200px", height: "700px", backgroundColor: "green", zIndex: "10", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto 150px", position: "relative" }}>
            {children}
        </div>
    )
}

export default Modal;