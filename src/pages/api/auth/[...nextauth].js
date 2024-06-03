import { api} from "../../../utils/serverConnections.js";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
    providers: [  
        CredentialsProvider({
            id: "login-next-auth",
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const response = await api.post('/session/login', {
                    email: credentials?.email,
                    password: credentials?.password
                })
                .catch((err) => {
                    if (err) {                         
                        console.log(`ERROR IN AUTHORIZE LOGIN--->`, err.message);
                        throw new Error("Failed to log in" + err.message);
                    }
                })

                if(!response) {
                    return null
                }

                const token = response.data.payload.token

                if (token) {
                    try {
                        const response = await api.get("api/users/current", {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        
                        const user = response?.data.payload;
    
                        return {
                            id: user._id,
                            name: user.first_name + ' ' + user.last_name,
                            email: user.email,
                            token: token,
                            age: user.age,
                            social: user.social,
                            rol: user.rol,
                            financialInfo: user.financialInfo,
                        }
                    } catch (error) {
                        console.log(`CATCH IN TOKEN CONDITIONAL--->`, error.message)
                        throw new Error("Failed to log in");
                    }
                    
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }) 
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/user/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            // console.log(`USER FROM JWT CALLBACK LINE 81`, user);
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.rol = user.rol;
                token.financialInfo = user.financialInfo;
                token.token = user.token;
            }
            // console.log(`TOKEN FROM JWT CALLBACK LINE 90`, token);
            return token;
        },
        async session({ session, token }) {
            // console.log(`TOKEN DESDE SESSION CALLBACK LINE 94`, token);
            if (session.user && token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.rol = token.rol;
                session.user.financialInfo = token.financialInfo;
                session.user.token = token.token;
            }
            // console.log(`SESSION DE NEXTAUTH, LINE 103--->`, session);

            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        }
    },
}


export default NextAuth(authOptions)