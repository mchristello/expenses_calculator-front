import UserProfileComponent from "@/components/Users/Account/UserPofileComponent";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { api } from "@/utils/serverConnections";
import { getServerSession } from "next-auth";
import Head from "next/head";


const UserProfile = ({ user }) => {

    return (
        <>
            <Head>
                <title>W.D.I.H.M!? || User Profile</title>
            </Head>
            <h2 className="text-4xl text-amber-600 mt-10">My Account</h2>
            <UserProfileComponent user={user}/>
        </>
    )
}


export const getServerSideProps = async (contex) => {
    const session = await getServerSession(contex.req, contex.res, authOptions);
    try {
        if (session && session.user) {
            const {data: response} = await api.get('/api/users/current', {
                headers: {
                    Authorization: `Bearer ${session.user.token}`
                }
            })
            return {
                props: {
                    user: response.payload
                }
            }
        }
        
    } catch (error) {
        console.log(`CATCH EN USER PAGE`, error.message);
    }
    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
}


export default UserProfile;