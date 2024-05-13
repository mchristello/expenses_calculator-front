import Head from "next/head"
import NavbarComponent from "../components/Navbar/NavbarComponent";

const Layout = ({ children }) => {

    return (
        <>
            <Head>
                <title>Page Title</title>
            </Head>
            <NavbarComponent />
            <main className="flex flex-col items-center w-full h-[100vh] gap-6">
                {children}
            </main>
        </>
    )
}


export default Layout;