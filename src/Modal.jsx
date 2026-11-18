import {useEffect} from 'react';

function Modal({ children }) {
    
    useEffect(() => {
        const previousOveflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOveflow;
        }
    }, []);
    
    return (
        <div style={{width: "750px", height: "80vh", backgroundColor: "green", zIndex: "10", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch", top: "50%", left: "50%", transform: "translate(-50%, -50%)", overflow: "hidden", padding: "20px", boxSizing: "border-box", position: "fixed" }}>
            {children}
        </div>
    )
}

export default Modal;