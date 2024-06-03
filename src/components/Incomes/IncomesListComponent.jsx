import { useIncomes } from "@hooks/useIncomes";
import { Button } from "flowbite-react";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { HiTrash } from "react-icons/hi2";

export const IncomesListComponent = ({ incomes }) => {

    const [ showIncomes, setShowIncomes ] = useState(incomes)

    const { totalIncomes, createIncome, categoryResults, getByCategory, saveComment, deleteMovement } = useIncomes(); 
    const [ comments, setComments ] = useState({});
    const [ showCategoryResults, setShowCategoryResults ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ isFormVisible, setIsFormVisible ] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        date: '',
        from: ''
    });

    const itemsPerPage = 15

    const totalPages = Math.ceil(showIncomes.length / itemsPerPage);

    const currentIncomes = showIncomes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        createIncome(formData)
    };

    const toggleFormVisibility = (e) => {
        e.preventDefault();
        setIsFormVisible(!isFormVisible)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleSearch = () => {
        console.log(`CLICK EN HANDLESEARCH`);
    }

    const handleGetByCategory = async () => {
        console.log(`CLICK handleGetByCategory`);
    }

    const handleCommentInput = (e, id) => {
        const { name, value } = e.target;
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

        setShowIncomes(prevIncomes =>
            prevIncomes.map(showIncomes =>
                showIncomes._id === id ? { ...showIncomes, comment } : showIncomes
            )
        );

        setComments(prevComments => ({
            ...prevComments,
            [id]: {
                comment: ''
            }
        }));
    }

    const handleDelete = (id) => {
        deleteMovement(id);
    }

    return (
        <section>
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
            <button onClick={toggleFormVisibility} className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200" >Add Income</button>
            { isFormVisible && (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
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
                        htmlFor="from"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        From
                    </label>
                    <input
                        type="text"
                        id="from"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                    Submit
                    </button>
                </form>
            )}
            { showCategoryResults 
            ? <div>  
                <h2 className="text-xl font-bold">Category Results</h2>
                <Button outline gradientDuoTone="redToYellow" onClick={() => setShowCategoryResults(false)} className="mb-4 rounded">
                    Back to All Incomes
                </Button> 
                <div className="flex justify-center m-5">
                    <Button pill
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                    >
                        <b>Previous</b>
                    </Button>
                    <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {incomes.length}</p>
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
                            <th className="px-4 py-2">From</th>
                            <th className="px-4 py-2">Add Comment</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryResults.map((income, index) => (
                            <tr key={income._id}>
                                <td className="border-2 border-cyan-800 px-4 py-2">{index + 1}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2"><button onClick={() => handleGetByCategory(income.category)}>{income.category.toUpperCase()}</button></td>
                                <td className="border-2 border-cyan-800 px-4 py-2 text-center">${income.amount}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2">{income.date}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2">{income.from}</td>
                                <td className="border-2 border-cyan-800 px-4 py-2 text-center align-middle">
                                    <p className="italic hover:not-italic hover:text-red-500 hover:font-bold">{(income.comment) && `"${income.comment}"`}</p>
                                    <input 
                                        type="text" 
                                        id='comment' 
                                        name='comment' 
                                        placeholder="Leave a comment..."
                                        value={comments[income._id]?.comment || ''} 
                                        onChange={(event) => handleCommentInput(event, income._id)} 
                                        className="border-cyan-600 border-2 rounded-md">
                                    </input>
                                    <Button className="hover:italic" outline gradientDuoTone='greenToBlue' type="submit" onClick={(event) => handleSaveComment(event, income._id)}>Confirm Comment
                                    </Button>
                                </td>
                                <td className="border-2 border-cyan-800">
                                    <Button outline gradientDuoTone="pinkToOrange" onClick={() => handleDelete(income._id)}>
                                        <HiTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2" className="border border-gray-800 px-4 py-2"><b>Total:</b></td>
                            <td className="text-xl text-red-700 border-2 border-cyan-800 px-4 py-2">${categoryResults.reduce((total, income) => total + income.amount, 0)}</td>
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
                    (incomes.length > 0) ?      
                    <div>   
                        <div className="flex justify-center m-5">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 mx-2 border rounded bg-gray-300 disabled:opacity-50"
                            >
                                <b>Previous</b>
                            </button>
                            <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {incomes.length}</p>
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
                                    <th className="px-4 py-2">From</th>
                                    <th className="px-4 py-2">Add Comment</th>
                                    <th className="px-4 py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentIncomes.map((income, index) => (
                                    <tr key={income._id}>
                                        <td className="border-2 border-cyan-800 px-4 py-2">{index + 1}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2"><button onClick={() => handleGetByCategory(income.category)}>{income.category.toUpperCase()}</button></td>
                                        <td className="border-2 border-cyan-800 px-4 py-2 text-center">${income.amount}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2">{income.date}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2">{income.from}</td>
                                        <td className="border-2 border-cyan-800 px-4 py-2 text-center align-middle">
                                            <p className="italic hover:not-italic hover:text-red-500 hover:font-bold">{(income.comment) && `"${income.comment}"`}</p>
                                            <input 
                                                type="text" 
                                                id='comment' 
                                                name='comment' 
                                                placeholder="Leave a comment..."
                                                value={comments[income._id]?.comment} 
                                                onChange={(event) => handleCommentInput(event, income._id)} 
                                                className="border-cyan-600 border-2 rounded-md">
                                            </input>
                                            <Button className="hover:italic" outline gradientDuoTone='greenToBlue' type="submit" onClick={(event) => handleSaveComment(event, income._id)}>Confirm Comment
                                            </Button>
                                        </td>
                                        <td className="border-2 border-cyan-800">
                                            <Button outline gradientDuoTone="pinkToOrange" onClick={() => handleDelete(income._id)}>
                                                <HiTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2" className="text-xl border-2 border-cyan-800 px-4 py-2"><b>Total</b></td>
                                    <td className="text-xl text-red-700 border-2 border-cyan-800 px-4 py-2">${totalIncomes}</td>
                                    <td colSpan="4" className="border-2 border-cyan-800 px-4 py-2"></td>
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
                            <p className="px-4 py-2"><span>Page</span> {currentPage} of {totalPages} - <span>Total Movements:</span> {incomes.length}</p>
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
                        <p className="mt-10 text-2xl">No incomes to show</p>
                    </div>
                }
            </div> 
            }
        </section>
    );
};
