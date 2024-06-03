import { Spinner } from "flowbite-react";
import { useState } from "react"
import {  useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const LoginComponent = () => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ isLoading, setIsLoading ] = useState(false);
    
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await signIn('login-next-auth', { ...data }, { callbackUrl: '/' })
        } catch (error) {
            console.log(`CATCH IN LOGIN COMPONENT -->`, error.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="flex flex-col text-center mt-1">
            <div className="w-[50vw]">
                <div className="m-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    { isLoading 
                        ? 
                            <Spinner color="success" />
                        : <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-6">
                                <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register('email') }
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <Link href={"/user/register"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        { ...register('password') }
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 p-6">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </section>
    )
}

