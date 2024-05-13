import { useForm, SubmitHandler } from "react-hook-form"

const RegisterComponent = () => {

    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center mt-5">
            <div className="flex flex-row p-6">
                <div className="flex flex-col">
                    <label htmlFor="first_name" className="block text-md font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("first_name")}
                            id="first_name"
                            name="first_name"
                            type="text"
                            autoComplete="first_name"
                            required
                            className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="flex flex-col ml-4">
                    <label htmlFor="last_name" className="block text-md font-medium leading-6 text-gray-900">
                        Last Name
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("last_name")}
                            id="last_name"
                            name="last_name"
                            type="text"
                            autoComplete="last_name"
                            required
                            className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-row p-6">
                <div className="flexflex-col w-full">
                    <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("email")}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-row p-6">
                <div className="flex items-center justify-between flex-col">
                    <label htmlFor="age" className="block text-md font-medium leading-6 text-gray-900">
                        Age
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("age")}
                            id="age"
                            name="age"
                            type="number"
                            autoComplete="age"
                            required
                            className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between flex-col ml-4">
                    <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            {...register("password")}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            required
                            className="px-1.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8 p-6">
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Create Account
                </button>
            </div>
        </form>
    )
}


export default RegisterComponent;