const express = require( 'express');
const path  = require('path');
const axios = require('axios');
const {Client} = require('pg');
const app = express();
const dotenv = require('dotenv').config();
const Redis = require('ioredis');
const URL = 'https://www.googleapis.com/books/v1/volumes?key=';



const redisClient = new Redis();



app.use(express.json());

const getBooks = (q) => 

    axios.get(`${URL}${process.env.API_KEY}&maxResults=40` + ( q ?`&q=${q}` : '&q=x'))
        .then(data => data.data)
        .catch(err => console.log(err));


app.get('/books', (req, res) => {
    // returns json
    getBooks(req.query.q).then(books => res.json(books.items));

});

// app.get('/register', (req, res) => {
//     // returns json
//     res.sendFile(path.join(__dirname, './build/index.html'));
// });

//app.post('/register', async (req, res) => {
//    // returns json
//
//    const username = req.body.username;
//    const password = req.body.password;
//    
//    // generate a token
//    const token = generateRandomString(16);
//
//    const client = new Client()
//    await client.connect()
//    // please don't use an sql injection here, it will work lmao
//    const query = `INSERT INTO user (username, password, token) VALUES ('${username}', '${password}', '${token}')`
//    // get the id of the created user
//    const result = await client.query(query)
//    const id = result.rows[0].id;
//    await client.end()
//    res.json({id: id, username: username, token: token});
//});

// app.get('/login', (req, res) => {
//     // returns json
//     res.sendFile(path.join(__dirname, './build/index.html'));
// })

//app.post('/login', async (req, res) => {
//    // returns json
//    const username = req.body.username;
//    const password = req.body.password;
//    const client = new Client()
//    await client.connect()
//    const query = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`
//    const result = await client.query(query)
//    const user = result.rows[0]
//    await client.end()
//    if (user) {
//        res.json({id: user.id, username: user.username, token: user.token});
//    } else {
//        res.json({error: 'Invalid username or password'});
//    }
//})

app.post('/orders', async (req, res) => {
    // returns json
    // const token = req.body.token;
    // const client = new Client()
    // await client.connect()
    // const query = `SELECT * FROM user WHERE token = '${token}'`
    // const result = await client.query(query)
    // const user = result.rows[0]
    // await client.end()
    // if (user) {
        const book = req.body.book;
        redisClient.lPush("order", JSON.stringify(book));
        res.json({success: true});
    // } else {
    //     res.json({error: 'Invalid token'});
    // }
})
app.get('/admin', async (req, res) => {
    books = await redis.lRange("orders", 0, -1);
    res.json(books);
})
app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
         res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});
app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', (req, res) => {
//     console.log('/');
//     res.sendFile(path.join(__dirname, './build/index.html'));
// });




app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
