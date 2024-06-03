import { useSession } from "next-auth/react"
import Link from "next/link";


const UserProfileComponent = ({ user }) => {

    const { data: session } = useSession();

    const userInfo = user
    
    return (
        <section className="flex flex-col">
            { session ?
                <section className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 dark:border-gray-3s00 dark:bg-gray-400 dark:hover:bg-gray-500">
                    <div className="w-[80vw]">
                        <div className="flex flex-row text-center">
                            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-auto md:rounded-none md:rounded-l-lg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal w-full m-3">
                                <div>
                                    <h3 className="text-3xl mb-4 font-bold tracking-tight text-gray-900 dark:text-white underline" >Welcome, {userInfo.first_name} !</h3>
                                    <h4 className="m-4" >Here is your info. ⬇️</h4>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><b>E-mail:</b> <i>{userInfo.email}</i></p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><b>Name:</b> <i>{userInfo.first_name} {userInfo.last_name}</i></p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-900" ><strong>Your User ID:</strong> <i className="font-extralight">{userInfo._id}</i></p>
                                    <div className="m-10">
                                        <Link className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-10" href={"/"}>Update <b>Info</b></Link>
                                        <Link className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-10" href={"/"}>Change <b>Password</b></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            :
                <h2>Please login.</h2>
            }
        </section>
    )
}


export default UserProfileComponent;