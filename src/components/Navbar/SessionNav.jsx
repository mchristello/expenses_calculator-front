import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


const SessionNav = () => {

    const { data: session } = useSession();

    // console.log({session});

    return (
        <section className="w-[100vw] mt-10 p-6">
            <ul className="flex flex-row justify-end text-cyan-800 text-xl font-bold">
                <li>
                    <Link href='/' className="p-8">Home</Link>
                </li>
                <li>
                    <Link href={`/expenses/${session.user.id}`} className="p-8">Expenses</Link>
                </li>
                <li>
                    <Link href={`/incomes/${session.user.id}`} className="p-8">Incomes</Link>
                </li>
                <li>
                    <Link href={`/user/${session.user.id}`} className="p-8">My Account</Link>
                </li>
                <li>
                    <Link href='/' onClick={() => signOut()} className="p-8">Sign Out</Link>
                </li>
            </ul>
        </section>
    )
}

export default SessionNav;