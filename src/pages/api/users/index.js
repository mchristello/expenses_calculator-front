import { api, connectAPI, connectBack } from "utils/serverConnections.js";

const handler = async (req, res) => {
    const authToken = req.headers.authorization
    const { uid } = req.query
    console.log({authToken});
    console.log({uid});

    if(req.method === 'GET') {
        try {
            const { data } = await api.get('/api/users');
            console.log(`FROM API/USERS ---> LINE 9`, data);

            return res.status(200).send(data);
        } catch (error) {
            console.log(`FROM GET IN PAGES/API-->`, error);
            return res.status(500).end()
        }
    }

    if(req.method === 'POST') {
        try {
            const { data } = await api.post('/session/register', { ...req.body })
            console.log(`FROM API/USERS ---> LINE 20`, data);
            return res.status(200).send(data)
        } catch (error) {
            console.log(`FROM POST IN PAGES/API-->`, error);
            return res.status(500).end()
        }
    }
}

export default handler;