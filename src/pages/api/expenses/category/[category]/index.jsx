import { api } from "@/utils/serverConnections";


const handler = async (req, res) => {
    const authToken = req.headers.authorization;
    const time = new Date().toLocaleString();
    if(req.method === 'GET') {
        try {
            const { category } = req.query;
        
            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            const { data: response } = await api.get(`/api/expenses/category/${category}`, {
                headers: {
                    Authorization: authToken
                }
            })
            return res.status(200).json(response.payload)
        } catch (error) {
            console.log(`CATCH IN PAGES/API/EXPENSES/CATEGORY -->`, error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default handler;