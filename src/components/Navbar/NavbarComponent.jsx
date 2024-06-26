import { useSession } from "next-auth/react";
import Link from "next/link"
import SessionNav from "./SessionNav";

const NavbarComponent = () => {

    const { data: session } = useSession();

    return (
        <>
            { session ? <SessionNav /> :
                <section className="w-[100vw] mt-10 p-6">
                    <ul className="flex flex-row justify-end text-cyan-800 text-xl font-bold">
                        <li>
                            <Link href='/' className="p-8">Home</Link>
                        </li>
                        <li>
                            <Link href='/user/login' className="p-8">Login</Link>
                        </li>
                        <li>
                            <Link href='/user/register' className="p-8">Sign Up</Link>
                        </li>
                    </ul>
                </section>
            }
        </>
    )
}

export default NavbarComponent;