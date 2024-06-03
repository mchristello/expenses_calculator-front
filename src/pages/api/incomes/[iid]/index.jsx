import { api } from "@/utils/serverConnections";


const handler = async (req, res) => {
    const authToken = req.headers.authorization
    const time = new Date().toLocaleString();

    if (req.method === 'PUT') {
        try {
            const { iid } = req.query
            const { data } = req.body

            console.log(data);

            const { data: response } = await api.put(`/api/incomes/update/${iid}`, { ...data }, {
                headers: {
                    Authorization: authToken
                }
            })
            return res.status(200).send(response)

        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error);
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { iid } = req.query
            console.log(iid);
            const { data: response } = await api.delete(`/api/incomes/delete/${iid}`, {
                headers: {
                    Authorization: authToken
                }
            })

            return res.status(200).send(response)
        } catch (error) {
            console.log(`CATCH IN ${req.method} at ${req.url} -->`, error);
            return res.status(500).json({ error: error.message });
        }
    }

}

export default handler;