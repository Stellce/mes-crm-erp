import express from 'express';
import pg from 'pg';

const app = express();
const port = 3001;
const con = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MES',
    password: 'zaq1@WSX',
    port: 5432,
});
await con.connect();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //change for prod
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000);
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
})

app.get('/items', async (req, res) => {
    const result = await con.query(`SELECT * FROM items`);
    res.json(result.rows);
});

app.put('/items', async (req, res) => {
    console.log('body: ', req.body);
    const { item_id, item_quantity } = req.body;
    const stock_qty = (await con.query(`SELECT quantity FROM items where item_id=${item_id};`)).rows[0]['quantity'];
    const result = await con.query(`update items set quantity=${stock_qty - item_quantity} where item_id =${item_id};`);
    res.json({received_body: req.body, result: result});
});

app.listen(port, () => console.log(`MES API running on port ${port}`));
