import { api } from "@/utils/serverConnections";


const handler = async (req, res) => {
    const authToken = req.headers.authorization;
    const time = new Date().toLocaleString();

    if (req.method === 'GET') {
        try {
            const { category } = req.query
            const { data: response } = await api.post(`/api/incomes/category/${category}`, {
                headers: {
                    Authorization: authToken
                }
            })

            return res.status(200).send(response.payload)
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error);
            return res.status(500).json({ error: error.message });
        }
    }
}

export default handler;