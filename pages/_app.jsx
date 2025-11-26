import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


export default function App({ Component, pageProps }) {
const router = useRouter()


useEffect(() => {
// simple auth redirect for protected routes (client-side)
const publicPaths = ['/login', '/api']
const token = typeof window !== 'undefined' ? localStorage.getItem('anm_token') : null


if (!token && !publicPaths.includes(router.pathname)) {
router.push('/login')
}
}, [router])


return <Component {...pageProps} />
}