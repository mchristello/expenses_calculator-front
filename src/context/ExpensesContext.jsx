import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { connectNextURL } from "utils/serverConnections.js";



export const ExpensesContext = createContext();


export const ExpenseProvider = ({ children }) => {
    
    const [ totalExpenses, setTotalExpenses ] = useState(0);
    const [ categoryResults, setCategoryResults ] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        try {
            if (session && session.user) {
                const fetchExpenses = async () => {
                    const {data: response} = await connectNextURL.get('/expenses', {
                        headers: {
                            Authorization: `Bearer ${session.user.token}`
                        }
                    })
                    const expenses = response;
                    const total = expenses.map(e => {
                        let amount = e.amount
                        return amount;
                    })
                    const acc = total.reduce((acc, acum) => acc + acum, 0);
                    setTotalExpenses(acc)
                }
                fetchExpenses();
            }
        } catch (error) {
            console.log(`Error en fetchEmailData`, error);
        }
    }, [session, totalExpenses, setTotalExpenses]);

    const fetchEmailData = async () => {
        const {data: response} = await connectNextURL.get('/expenses/fetchData', {
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        });
        return response
    }

    const createExpense = async (formData) => {
        try {
            const { data: response } = await connectNextURL.post(`/expenses`, (formData),  {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            });

            return response;
        } catch (error) {
            console.log(`CATCH IN EXPENSESCONTEXT CREATEEXPENSE -->`, error.message);
        }
    }

    const getByCategory = async (category) => {
        try {
            const { data: response } = await connectNextURL.get(`/expenses/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })
            setCategoryResults(response);
        } catch (error) {
            console.log(`CATCH IN EXPENSESCONTEXT GETBYCATEGORY -->`, error.message);
        }
    }

    const saveComment = async (eid, data) => {
        try {
            const { data: response } = await connectNextURL.put(`/expenses/${eid}`, { data }, {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            });

            return response
        } catch (error) {
            console.log(`CATCH IN EXPENSESCONTEXT SAVECOMMENT -->`, error.message);
        }
    }

    const deleteMovement = async (eid) => {
        try {
            const { data: response } = await connectNextURL.delete(`/expenses/${eid}`,  {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            });

            return response;
        } catch (error) {
            console.log(`CATCH IN EXPENSESCONTEXT DELETEMOVEMENT -->`, error.message);
        }
    }

    const data = {
        totalExpenses,
        fetchEmailData,
        createExpense,
        getByCategory,
        categoryResults,
        saveComment,
        deleteMovement
    }


    return (
        <ExpensesContext.Provider value={( data )}>
            {children}
        </ExpensesContext.Provider>
    )
}