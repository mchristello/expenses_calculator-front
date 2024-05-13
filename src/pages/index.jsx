import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    
      <>
        <Head>
          <title>Why don't I have money!?</title>
        </Head>
        <main className={`flex flex-col items-center p-6 ${inter.className}`}>
          <h1 className='text-5xl text-red-600'>Hola Mundo</h1>
        </main>
      </>
    
  )
}