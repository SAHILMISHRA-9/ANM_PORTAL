export default function handler(req, res) {
const data = [
{ id: 1, name: 'Rekha Devi', edd: '2025-06-12', risk: 'high', asha: 'Sunita', notes: 'BP high' },
{ id: 2, name: 'Pooja Singh', edd: '2025-03-10', risk: 'normal', asha: 'Meena', notes: '' },
{ id: 3, name: 'Sita Kumari', edd: '2025-08-22', risk: 'normal', asha: 'Gita', notes: '' }
]
res.status(200).json(data)
}