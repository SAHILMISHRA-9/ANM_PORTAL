import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'


export default function Login() {
const [mobile, setMobile] = useState('')
const [password, setPassword] = useState('')
const router = useRouter()


const handleSubmit = async (e) => {
e.preventDefault()
try {
// call mock API
const res = await axios.post('/api/auth/login', { mobile, password })
if (res.data && res.data.token) {
localStorage.setItem('anm_token', res.data.token)
localStorage.setItem('anm_user', JSON.stringify(res.data.user))
router.push('/dashboard')
} else {
alert('Login failed')
}
} catch (err) {
alert('Login error')
}
}


return (
<div className="min-h-screen flex items-center justify-center">
<div className="w-full max-w-md bg-white rounded-lg shadow p-6">
<h2 className="text-2xl font-bold mb-4 text-center">ANM Portal Login</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="block text-sm">Mobile Number</label>
<input value={mobile} onChange={e=>setMobile(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter mobile" />
</div>
<div>
<label className="block text-sm">Password</label>
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Enter password" />
</div>
<button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
</form>
<p className="mt-4 text-sm text-gray-500">Mock login: mobile: <b>9999999999</b> password: <b>anm123</b></p>
</div>
</div>
)
}