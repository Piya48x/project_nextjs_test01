import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('Cluster0'); // เปลี่ยนชื่อฐานข้อมูลที่นี่

    if (req.method === 'GET') {
        const users = await db.collection('users').find({}).toArray();
        res.json(users);
    } else if (req.method === 'POST') {
        const user = req.body;
        await db.collection('users').insertOne(user);
        res.status(201).json(user);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
