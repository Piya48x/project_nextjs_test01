import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://pdpd4650z:d82To5AFq2KJyBBy@cluster0.3qolx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // ในระหว่างการพัฒนา ให้ใช้ MongoClient ในการเชื่อมต่อ
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // ในการผลิต ให้สร้างใหม่ทุกครั้ง
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
