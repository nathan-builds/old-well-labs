import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
    providers: [
        // can configure whatever credential providers are needed such as GitHub OAuth etc...
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // The main logic for authenticating a user would be added here, call to a backend somewhere
                const user = {};
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                }
            },
        }),
    ],

    //IF using JWT strategy for authentication this will put the jwe on the session to make it available for
    // other parts of the app

    // callbacks: {
    //     async jwt({ token, user }) {
    //         return { ...token, ...user };
    //     },
    //     async session({ session, token, user }) {
    //         session.user = token as any;
    //         return session;
    //     },
    // },
});