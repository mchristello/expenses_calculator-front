import { IncomesListComponent } from "../../components/Incomes/IncomesListComponent";
import Head from "next/head";


const IncomesPage = () => {

    return (
        <>
            <Head>
                <title>Why don't I have money!? || Incomes</title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">Incomes List Component</h2>
            <IncomesListComponent />
        </>
    )
}

export default IncomesPage