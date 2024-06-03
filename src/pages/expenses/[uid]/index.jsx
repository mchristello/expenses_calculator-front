import { api, connectAPI, connectBack } from "../../../utils/serverConnections.js"
import { ExpensesComponent } from "@/components/Expenses/ExpensesCompomponent.jsx"
import { getServerSession } from "next-auth"
import Head from "next/head.js"
import { authOptions } from "pages/api/auth/[...nextauth].js"


const ExpensesPage = ({ expenses }) => {

    return (
        <>
            <Head>
                <title>W.D.I.H.M!? || Expenses </title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">Expense List Component</h2>
            <ExpensesComponent expenses={expenses} />
        </>
    )
}


export const getServerSideProps = async (context) => {
    try {
        const session = await getServerSession(context.req, context.res, authOptions);
        if (session && session.user) {
            const {data: response} = await api.get('/api/expenses' , {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            });

            return {
                props: {
                    expenses: response.payload
                }
            }
        }
    } catch (error) {
        console.log(`CATCH EN EXPENSES PAGE`, error.message);
        return {
            props: {
                expenses: []
            },
        };
    }
}

export default ExpensesPage