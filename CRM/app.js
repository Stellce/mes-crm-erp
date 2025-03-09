import express from 'express';
import pg from 'pg';

const app = express();
const port = 3002;
const con = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'CRM',
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

app.get('/clients', async (req, res) => {
    const result = await con.query(`SELECT * FROM clients`);
    res.json(result.rows);
});

app.listen(port, () => console.log(`CRM API running on port ${port}`));
