import Head from "next/head";
import { LoginComponent } from '../../components/Users/Login/LoginComponent';


const LoginPage = () => {

    return (
        <>
            <Head>
                <title>Why don't I have money!? || Login</title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">Login</h2>
            <LoginComponent />
        </>
    )
}

export default LoginPage;