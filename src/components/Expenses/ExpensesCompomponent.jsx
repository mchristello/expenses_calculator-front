import { useEffect, useState } from "react";
import { connectAPI } from "../../utils/serverConnections";




export const ExpensesComponent = ({ expenses }) => {

    // console.log(`FROM EXPENSES COMPONENT ---> `, expenses);
    const [ totalExpenses, setTotalExpenses ] = useState(0);
    const [ fetching, setFetching ] = useState(false);

    useEffect(() => {
        try {
            const total = expenses.map(e => {
                let ammount = e.importe
                return ammount;
            })
            const acc = total.reduce((acc, acum) => acc + acum, 0);
            setTotalExpenses(acc)
        } catch (error) {
            console.log(`Error en fetchEmailData`, e.message);
        }
    }, [setTotalExpenses]);

    const handleClick = async () => {
        try {
            setFetching(true);
            const response = await fetch('http://localhost:8080/api/imap/fetchData');
            const data = await response.json();
            return expenses
        } catch (e) {
            console.log(`Error en fetchEmailData`, e.message);
        } finally {
            setFetching(false);
        }
    }

    return (
        <section>
            <div>
                {
                    (expenses.length > 0) ?         
                    <table className="mb-10">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Recipient</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(e => (
                                <tr key={e.id}>
                                    <td className="border border-gray-800 px-4 py-2">{e.id}</td>
                                    <td className="border border-gray-800 px-4 py-2">{e.categoria.toUpperCase()}</td>
                                    <td className="border border-gray-800 px-4 py-2">${e.importe}</td>
                                    <td className="border border-gray-800 px-4 py-2">{e.fecha}</td>
                                    <td className="border border-gray-800 px-4 py-2">{e.destino}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2" className="border border-gray-800 px-4 py-2">Total:</td>
                                <td className="border border-gray-800 px-4 py-2">${totalExpenses}</td>
                                <td colSpan="2" className="border border-gray-800 px-4 py-2"></td>
                            </tr>
                        </tbody>
                    </table>
                    : 
                    <div>
                        <p className="mt-10">No expenses to show</p>
                        <button className="m-auto" type="submit" onClick={() =>handleClick()}>
                            {fetching ? 'Fetching...' : 'Fetch Email data'}
                        </button>
                    </div>
                }
            </div>
        </section>
    )
}