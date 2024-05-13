import { connectAPI } from "../../utils/serverConnections.js"
import { ExpensesComponent } from "../../components/Expenses/ExpensesCompomponent.jsx"


const ExpensesPage = ({ expenses }) => {

    return (
        <>
            <h2 className="text-4xl text-amber-600 mt-10">Expense List Component</h2>
            <ExpensesComponent expenses={expenses} />
        </>
    )
}


export const getServerSideProps = async () => {
    try {
        const {data: response} = await connectAPI.get('/imap/getInfo');

        return {
            props: {
                expenses: response.payload
            }
        }
    } catch (error) {
        console.log(error.message);
        return {
            props: {
                expenses: []
            },
        };
    }
}

export default ExpensesPage