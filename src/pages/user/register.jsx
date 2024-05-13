import RegisterComponent from "../../components/Users/Register/RegisterComponent"
import Head from "next/head";


const RegisterPage = () => {

    return (
        <>
            <Head>
                <title>Why don't I have money!? || New Account</title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">Sign Up.</h2>
            <RegisterComponent />
        </>
    )
}


export default RegisterPage;