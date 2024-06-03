import { api } from "utils/serverConnections";


const handler = async (req, res) => {
    const authToken = req.headers.authorization;
    const time = new Date().toLocaleString()

    if (req.method === 'GET') {
        try {
            const { data: response } = await api.get(`/api/imap/fetchData`, {
                headers: {
                    Authorization: authToken
                }
            })

            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            return res.status(200).send(response)
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url}`, error.message);
            return res.status(500).end();
        }
    }
}

export default handler;