import { api } from '@/utils/serverConnections';


const handler = async(req, res) => {
    const authToken = req.headers.authorization;
    const time = new Date().toLocaleString();

    if (req.method === 'GET') {
        try {
            const { data: response } = await api.get(`/api/expenses`, {
                headers: {
                    Authorization: authToken
                }
            })
    
            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            const expenses = response.payload
    
            return res.status(200).send(expenses);  
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const newExpense = req.body
            const formatDateString = (dateString) => {
                const [year, month, day] = dateString.split('-');
                return `${day}-${month}-${year}`;
            };

            newExpense.date = formatDateString(newExpense.date);
            const { data: response } = await api.post('/api/expenses/add', newExpense, {
                headers: {
                    Authorization: authToken
                }
            })
            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            const createdExpense = response.payload;

            return res.status(200).send({createdExpense})
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default handler;