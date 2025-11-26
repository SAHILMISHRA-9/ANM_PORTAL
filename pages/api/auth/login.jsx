export default function handler(req, res) {
const { mobile, password } = req.body
// mock credentials
if (mobile === '9999999999' && password === 'anm123') {
return res.status(200).json({ token: 'mock-token-abc', user: { id: 1, name: 'Rekha Devi', role: 'ANM', sub_center: 'SC-001' } })
}
return res.status(401).json({ error: 'Invalid' })
}