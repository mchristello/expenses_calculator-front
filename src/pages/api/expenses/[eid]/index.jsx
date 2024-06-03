import { api } from "@/utils/serverConnections";


const handler = async (req, res) => {
    const authToken = req.headers.authorization;
    const time = new Date().toLocaleString();

    if (req.method === 'DELETE') {
        try {
            const {eid} = req.query;
            const { data: response } = await api.delete(`/api/expenses/delete/${eid}`, {
                headers: {
                    Authorization: authToken
                }
            });

            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`, response);
            return res.status(200).send('OK');
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url}`, error.message);
            return res.status(500).end();
        }
    }

    if (req.method === 'PUT') {
        try {
            const { eid } = req.query;
            const { data } = req.body;
            const { data: response } = await api.put(`api/expenses/update/${eid}`, { ...data }, {
                headers: {
                    Authorization: authToken
                }
            });
            console.log(`${req.method} DESDE PAGES ${req.url}, at ${time}`);

            return res.status(200).send(response);
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url}`, error.message);
            return res.status(500).end();
        }
    }

}

export default handler;