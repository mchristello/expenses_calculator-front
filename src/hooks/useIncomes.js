import { IncomesContext } from "context/IncomesContext"
import { useContext } from "react"


export const useIncomes = () => {
    const context = useContext(IncomesContext);

    if (!context) throw new Error('useCart debe ser utilizado dentro de un CartProvider');

    return context;
}