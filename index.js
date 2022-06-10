const express = require('express')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');


const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g697s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        console.log('Database connect sucess');
        const dateCollection = client.db("Gramoday_App").collection("date");


        app.get('/date', async (req, res) => {
            const query = {};
            const cursor = dateCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);

        });

        

          app.post('/date', async (req, res) => {
            const order = req.body;
            const result = await dateCollection.insertOne(order);
            res.send(result);
          })
       


        
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World! Slated')
})

app.listen(port, () => {
    console.log(`Slated app listening on port ${port}`)
})