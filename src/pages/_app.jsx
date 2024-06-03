import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import Layout from './layout'
import { ExpenseProvider } from 'context/ExpensesContext';
import { IncomeProvider } from 'context/IncomesContext';

export default function App({ Component, pageProps, session  }) {
  return (
    
    <>
      <SessionProvider session={session}>
        <ExpenseProvider >
          <IncomeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </IncomeProvider>
        </ExpenseProvider>
      </SessionProvider>
    </>

  )
}
