import { ExpensesContext } from "context/ExpensesContext"
import { useContext } from "react"


export const useExpenses = () => {
    const context = useContext(ExpensesContext);

    if (!context) throw new Error('useCart debe ser utilizado dentro de un CartProvider');

    return context;
}