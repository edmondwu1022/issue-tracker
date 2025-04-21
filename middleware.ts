// export { default } from "next-auth/middleware"
import { sign } from "crypto"
import { withAuth } from "next-auth/middleware"

export default withAuth(function middleware(req) {
    console.log(req.nextauth.token)
},
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token
            }
        },
        pages: {
            signOut: "/",
        }
    }

)

export const config = {
    matcher: [
        '/issues/new',
    ]
}