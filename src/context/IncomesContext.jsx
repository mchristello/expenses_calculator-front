import { connectNextURL } from "@/utils/serverConnections.js";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";



export const IncomesContext = createContext();

export const IncomeProvider = ({ children }) => {

    const [ totalIncomes, setTotalIncomes ] = useState(0);
    const [ categoryResults, setCategoryResults ] = useState([])
    const { data: session } = useSession();

    useEffect(() => {
        try {
            if (session && session.user) {
                const fetchIncomes = async () => {
                    const { data: response } = await connectNextURL.get('/incomes', {
                        headers: {
                            Authorization: `Bearer ${session.user.token}`
                        }
                    })
                    const incomes = response
                    const total = incomes.map(i => {
                        let amount = i.amount
                        return amount;
                    })

                    const acc =total.reduce((prevValue, total) => prevValue + total, 0)
                    setTotalIncomes(acc);
                }

                fetchIncomes()
            }
        } catch (error) {
            console.log(`CATCH IN INCOMESCONTEXT USEEFFECT -->`, error.message);
        }
    }, [session, totalIncomes, setTotalIncomes]);

    const createIncome = async (formData) => {
        console.log({formData});
        try {
            const { data: response } = await connectNextURL.post('/incomes', (formData), {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            });
            return response
        } catch (error) {
            console.log(`CATCH IN INCOMES CONTEXT CREATEEXPENSE -->`, error.message);
        }
    }

    const getByCategory = async (category) => {
        try {
            const { data: response } = await connectNextURL.get(`/incomes/category/${category}`, {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })

            setCategoryResults(response)
        } catch (error) {
            console.log(`CATCH IN INCOMES CONTEXT GETBYCATEGORY -->`, error.message);
        }
    }

    const saveComment = async (iid, data) => {
        try {
            const { data: response } = await connectNextURL.put(`/incomes/${iid}`, { data }, {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })

            return response
        } catch (error) {
            console.log(`CATCH EN INCOMES CONTEXT, SAVECOMENT ---> `, error.message);
        }
    }

    const deleteMovement = async (iid) => {
        try {
            console.log(iid);
            const { data: response } = await connectNextURL.delete(`/incomes/${iid}`, {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })

            return response;
        } catch (error) {
            console.log(`CATCH IN INCOMES CONTEXT DELETEMOVEMENT -->`, error.message);
        }
    }

    const data = {
        totalIncomes,
        createIncome,
        getByCategory,
        categoryResults,
        saveComment,
        deleteMovement
    }

    return (
        <IncomesContext.Provider value={(data)}>
            { children }
        </IncomesContext.Provider>
    )
}