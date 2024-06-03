import { api } from "@/utils/serverConnections";



const handler = async (req, res) => {
    const authToken = req.headers.authorization
    const time = new Date().toLocaleString();

    if (req.method === 'GET') {
        try {
            const { data: response } = await api.get('/api/incomes', {
                headers: {
                    Authorization: authToken
                }
            })

            const incomes = response.payload

            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            return res.status(200).send(incomes);  
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const newIncome = req.body
            console.log({newIncome});
            // const formatDateString = (dateString) => {
            //     const [year, month, day] = dateString.split('-');
            //     return `${day}-${month}-${year}`;
            // };

            // newIncome.date = formatDateString(newIncome.date);

            const { data: response } = await api.post('/api/incomes/add', newIncome, {
                headers: {
                    Authorization: authToken
                }
            })

            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            const createdIncome = response.payload

            return res.status(200).send({createdIncome})
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default handler;