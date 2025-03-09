const bcrypt = require('bcrypt');
const express = require('express');
const pool = require('./db');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/', (req, res) => {
    res.send('<h1>MENU CARD API</h1>');
});

// ✅ Fetch all menu items
app.get('/menu', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu');
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




// ✅ Fetch menu by ID
app.get('/menuById', async (req, res) => {
    try {
        const { id } = req.query;  // Use query params for GET requests
        const result = await pool.query('SELECT * FROM menu WHERE mid=$1', [id]);
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Delete menu by ID
app.delete('/delmenuById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM menu WHERE mid=$1', [id]);
        res.json({ status: "200", message: "Delete Success" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Add new menu item
app.post('/addmenu', async (req, res) => {
    try {
        const { mname, price, fid, qid } = req.body;
        const result = await pool.query(
            'INSERT INTO menu (mname, price, fid, qid) VALUES ($1, $2, $3, $4) RETURNING *',
            [mname, price, fid, qid]
        );
        res.json({ status: "200", message: "Save Success", data: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Update menu item
app.put('/updatemenu', async (req, res) => {
    try {
        const { id, mname, price, fid, qid } = req.body;
        await pool.query(
            'UPDATE menu SET mname=$1, price=$2, fid=$3, qid=$4 WHERE mid=$5',
            [mname, price, fid, qid, id]
        );
        res.json({ status: "200", message: "Update Success" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Fetch all food categories
app.get('/food_cat', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM food_cat');
        res.json({ foodcat: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Delete food category by ID
app.delete('/delfoodcatById',async(req,res)=>{

    try{
        const{fid}=req.body;
        var result=await pool.query('DELETE FROM food_cat WHERE fid=$1',[fid]);
        res.json({foodcat:result.rows});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }
})


// ✅ Add food category
app.post('/addfoodcat', async (req, res) => {
    try {
        const { fid, category } = req.body;
        const result = await pool.query(
            'INSERT INTO food_cat (fid, category) VALUES ($1, $2) RETURNING *',
            [fid, category]
        );
        res.json({ status: "200", message: "Save Success", data: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Update food category
app.put('/updatefoodcat', async (req, res) => {
    try {
        const { fid, category } = req.body;
        await pool.query('UPDATE food_cat SET category=$1 WHERE fid=$2', [category, fid]);
        res.json({ status: "200", message: "Update Success" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Fetch all quantity items
app.get('/qty', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM qty_mast');
        res.json({ qty: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Delete quantity item by ID
app.delete('/qtydel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM qty_mast WHERE qid=$1', [id]);
        res.json({ status: "200", message: "Delete Success" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Add quantity item
app.post('/addmenuqty', async (req, res) => {
    try {
        const { id,qty, price } = req.body;
        const result = await pool.query(
            'INSERT INTO qty_mast (qid,qty, price) VALUES ($1,$2, $3) RETURNING *',
            [id, qty, price]
        );
        res.json({ status: "200", message: "Save Success", data: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ✅ Update quantity item
app.put('/updateqty', async (req, res) => {
    try {
        const { id, item_name, qty, price } = req.body;
        await pool.query(
            'UPDATE qty_mast SET item_name=$1, qty=$2, price=$3 WHERE qid=$4',
            [item_name, qty, price, id]
        );
        res.json({ status: "200", message: "Update Success" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { uname,pwd } = req.body;
        const result = await pool.query('select  uname,pwd from admin where uname=$1 and pwd=$2',
            [uname,pwd ]);
        //res.json(result.rows);
        res.send({status: "200 ",message: "Login Success "})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(3000, '127.0.0.1', () => {
    console.log('Server started on http://127.0.0.1:3000');
});
