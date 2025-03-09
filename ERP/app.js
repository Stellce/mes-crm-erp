import express from 'express';
import pg from 'pg';
import axios from "axios";

const app = express();
const port = 3003;
const con = new pg.Client({
    user: 'postgres', // np. 'postgres'
    host: 'localhost',
    database: 'ERP',
    password: 'zaq1@WSX',
    port: 5432,
});
await con.connect();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // change for prod
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000);
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
})

app.get('/orders', async (req, res) => {
    const result = await con.query(`SELECT * FROM orders;`);
    res.json(result.rows);
});

app.post('/orders', async (req, res) => {
    const order = req.body;
    const result = await con.query(`insert into orders (item_id, client_id, item_quantity, price, status) values (${order.item_id}, ${order.client_id}, ${order.item_quantity}, ${order.price}, '${order.status}');`);

    const body = { item_id: order.item_id, item_quantity: order.item_quantity };
    const r = await axios.put('http://localhost:3001/items', body);
    console.log(r);
    res.sendStatus(200);
});

app.listen(port, () => console.log(`ERP API running on port ${port}`));
