import { IncomesListComponent } from "@/components/Incomes/IncomesListComponent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { api } from "@/utils/serverConnections";
import { getServerSession } from "next-auth";
import Head from "next/head";


const IncomesPage = ({ incomes }) => {

    const title = `Why don't I have money!? || Incomes`

    return (
        <>
            <Head>
                <title> { title } </title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">Incomes List Component</h2>
            <IncomesListComponent incomes={ incomes } />
        </>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    try {
        if (session && session.user) {
            const { data: response } = await api.get('/api/incomes', {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })

            return {
                props: {
                    incomes: response.payload
                }
            }
        }
    } catch (error) {
        console.log(`CATCH EN INCOMES PAGE`, error.message);
        return {
            props: {
                incomes: []
            },
        };
    }
}

export default IncomesPage