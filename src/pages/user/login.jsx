import Head from "next/head";
import { LoginComponent } from '../../components/Users/Login/LoginComponent';


const LoginPage = () => {

    return (
        <>
            <Head>
                <title>W.D.I.H.M!? || Login</title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">Login</h2>
            <LoginComponent />
        </>
    )
}

export default LoginPage;