import {  useState } from "react";
import { useExpenses } from "hooks/useExpenses";
import DeleteButton from "../Multi/DeleteButon";
import { Button } from "flowbite-react";
import { FcSearch } from "react-icons/fc";

const categories = [ 
    'tarjeta de debito', 
    'tarjeta de credito', 
    'debito en cuenta', 
    'transferencia desde banco'
]


export const ExpensesComponent = ({ expenses }) => {

    const [ showExpenses, setShowExpenses ] = useState(expenses);

    const { totalExpenses, fetchEmailData, createExpense, getByCategory, categoryResults, saveComment } = useExpenses();
    const [ showCategoryResults, setShowCategoryResults ] = useState(false);
    const [ fetching, setFetching ] = useState(false);
    const [ isFormVisible, setIsFormVisible ] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        date: '',
        destinedTo: '',
    });
    const [comments, setComments] = useState({})

    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(expenses.length / itemsPerPage);

    const currentExpenses = showExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleClick = async () => {
        try {
            setFetching(true);
            fetchEmailData();
        } catch (e) {
            console.log(`Error en fetchEmailData`, e.message);
        } finally {
            setFetching(false);
        }
    }

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    }

    const handleChange = (e) => {
        const {name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        createExpense(formData)
    }

    const handleSearch = async() => {
        await getByCategory(searchTerm)
    }

    const handleGetByCategory = async (category) => {
        await getByCategory(category);
        setShowCategoryResults(true);
    }
    
    const handleCommentInput = (e, id) => {
        const {name, value } = e.target
        setComments(prevComments => ({
            ...prevComments,
            [id]: {
                [name]: value
            }
        }))
    }

    const handleSaveComment = async (e, id) => {
        e.preventDefault();
        const comment = comments[id]?.comment || '';

        await saveComment(id, { comment });

        setShowExpenses(prevExpenses => 
            prevExpenses.map(showExpenses => 
                showExpenses._id === id ? { ...showExpenses, comment } : showExpenses
            )
        );

        setComments(prevComments => ({
            ...prevComments, 
            [id]: {
                comments: ''
            }
        }))
    }


    return (
        <section className="flex flex-col items-center">
            <div className="mb-4 flex flex-row items-center">
                <label htmlFor="categoryInput" className="mr-2 text-xl text-bold">Filtrar por categoría:</label>
                <input
                    id="categoryInput"
                    name="categoryInput"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-800 px-4 py-2 rounded-lg"
                />
                <Button
                    outline
                    gradientMonochrome="teal"
                    onClick={handleSearch}
                    className="ml-2 text-black rounded-md"
                    value="Search"
                >
                    <FcSearch size="1.5em" />
                </Button>
            </div>
            <div className="flex flex-row gap-10">
                <button className="rounded-md bg-cyan-800 p-2 text-stone-200 hover:bg-slate-500" type="submit" onClick={() =>handleClick()}>
                    {fetching ? 'Fetching...' : 'Fetch Email data'}
                </button>
                
                <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200" onClick={toggleFormVisibility} >Add Expense</button>
            </div>
            <div className="w-full m-5">
                { isFormVisible && (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg"
                    >
                        <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        </div>
                        <div className="mb-4">
                        <label
                            htmlFor="amount"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        </div>
                        <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        </div>
                        <div className="mb-4">
                        <label
                            htmlFor="destinedTo"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Destined To
                        </label>
                        <input
                            type="text"
                            id="destinedTo"
                            name="destinedTo"
                            value={formData.destinedTo}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                        Confirm
                        </button>
                    </form>
                )}
            </div>
            { showCategoryResults 
            ? <div>  
                <h2 className="text-xl font-bold">Category Results</h2>
                <Button outline gradientDuoTone="redToYellow" onClick={() => setShowCategoryResults(false)} className="mb-4 rounded">
                    Back to All Expenses
                </Button> 
                <div className="flex justify-center m-5">
                    <Button pill
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                    >
                        <b>Previous</b>
                    </Button>
                    <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {expenses.length}</p>
                    <Button pill 
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                    >
                        <b>Next</b>
                    </Button>
                </div>
                <table className="w-full mx-auto shadow-lg rounded-lg bg-slate-200">
                    <thead className="border-2 border-cyan-800">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Recipient</th>
                            <th className="px-4 py-2">Add Comment</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryResults.map((e, index) => (
                            <tr key={e._id}>
                                <td className="border-2 border-cyan-800 px-4 py-2">{index + 1}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2"><button onClick={() => handleGetByCategory(e.category)}>{e.category.toUpperCase()}</button></td>
                                <td className="border-2 border-cyan-800 px-4 py-2 text-center">${e.amount}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2">{e.date}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2">{e.destinedTo}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2 text-center align-middle">
                                    <p className="italic hover:not-italic hover:text-red-500 hover:font-bold">{(e.comment) && `"${e.comment}"`}</p>
                                    <input 
                                        type="text" 
                                        id='comment' 
                                        name='comment' 
                                        placeholder="Leave a comment..."
                                        value={comments[e._id]?.comment || ''} 
                                        onChange={(event) => handleCommentInput(event, e._id)} 
                                        className="border-cyan-600 border-2 rounded-md">
                                    </input>
                                    <Button className="hover:italic" outline gradientDuoTone='greenToBlue' type="submit" onClick={(event) => handleSaveComment(event, e._id)}>Confirm Comment
                                    </Button>
                                </td>
                                <td className="border-2 border-cyan-800"><DeleteButton id={e._id}/></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2" className="border border-gray-800 px-4 py-2"><b>Total:</b></td>
                            <td className="text-xl text-red-700 border-2 border-cyan-800 px-4 py-2">${categoryResults.reduce((total, e) => total + e.amount, 0)}</td>
                            <td colSpan="4" className="border border-gray-800 px-4 py-2"></td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center m-5">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                    >
                        <b>Previous</b>
                    </button>
                    <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {categoryResults.length}</p>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                    >
                        <b>Next</b>
                    </button>
                </div> 
            </div>
            : <div>
                {
                    (expenses.length > 0) ?      
                    <div>   
                        <div className="flex justify-center m-5">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                            >
                                <b>Previous</b>
                            </button>
                            <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {expenses.length}</p>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                            >
                                <b>Next</b>
                            </button>
                        </div>
                        <table className="w-full mx-auto shadow-lg rounded-lg bg-slate-200">
                            <thead className="border-2 border-cyan-800">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Recipient</th>
                                    <th className="px-4 py-2">Add Comment</th>
                                    <th className="px-4 py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentExpenses.map((e, index) => (
                                    <tr key={e._id}>
                                        <td className="border-2 border-cyan-800 px-4 py-2">{index + 1}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2"><button onClick={() => handleGetByCategory(e.category)}>{e.category.toUpperCase()}</button></td>
                                        <td className="border-2 border-cyan-800 px-4 py-2 text-center">${e.amount}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2">{e.date}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2">{e.destinedTo}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2 text-center align-middle">
                                            <p className="italic hover:not-italic hover:text-red-500 hover:font-bold">{(e.comment) && `"${e.comment}"`}</p>
                                            <input 
                                                type="text" 
                                                id='comment' 
                                                name='comment' 
                                                placeholder="Leave a comment..."
                                                value={comments[e._id]?.comment || ''} 
                                                onChange={(event) => handleCommentInput(event, e._id)} 
                                                className="border-cyan-600 border-2 rounded-md">
                                            </input>
                                            <Button className="hover:italic" outline gradientDuoTone='greenToBlue' type="submit" onClick={(event) => handleSaveComment(event, e._id)}>Confirm Comment
                                            </Button>
                                        </td>
                                        <td className="border-2 border-cyan-800"><DeleteButton id={e._id}/></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2" className="text-xl border-2 border-cyan-800 px-4 py-2"><b>Total</b></td>
                                    <td className="text-xl text-red-700 border-2 border-cyan-800 px-4 py-2">${totalExpenses}</td>
                                    <td colSpan="4" className="border-2 border-cyan-800 px-4 py-2"></td>
                                </tr>
                                {/* <tr>
                                    <td colSpan="3" className="border border-gray-800 px-4 py-2"><b>Total:</b></td>
                                    <td className="border border-gray-800 px-4 py-2">${expenses.reduce((total, e) => total + e.amount, 0)}</td>
                                    <td colSpan="3" className="border border-gray-800 px-4 py-2"></td>
                                </tr> */}
                            </tbody>
                        </table>
                        <div className="flex justify-center m-5">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                            >
                                <b>Previous</b>
                            </button>
                            <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {expenses.length}</p>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                            >
                                <b>Next</b>
                            </button>
                        </div>
                    </div>
                    : 
                    <div>
                        <p className="mt-10 text-2xl">No expenses to show</p>
                    </div>
                }
            </div>
            }

        </section>
    )
}