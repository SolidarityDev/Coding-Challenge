const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mysqlApostrophe = require("mysql-apostrophe");

const app = express();



const SELECT_ALL_FILMS = 'SELECT * FROM Films';
const SELECT_ALL_SERIES = 'SELECT * FROM Series';
const SELECT_FILTER_FILMS = 'SELECT * FROM Films WHERE release_Year >= 2010 LIMIT 21';
const SELECT_FILTER_SERIES = 'SELECT * FROM Series WHERE release_Year >= 2010 LIMIT 21';
const SELECT_DOCUMENTARY_SERIES ='SELECT * FROM `Series` WHERE category_id = 3;'
const SELECT_DOCUMENTARY_FILMS ='SELECT * FROM `Films` WHERE category_id = 3;'


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'movies_database',
    port: 8889,
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        strict: false
});

connection.query(err => {
    if(err){
        return err;
    }
});
console.log(connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(mysqlApostrophe);

app.use(cors());

app.get('/', (req, res) => {
res.send('go to /films to see films or /series to see series')
});

/*app.get('/films/add', (req, res) =>{
const {titre_film, date_sortie} = req.query; 
console.log(titre_film, date_sortie);
res.send('adding films');
});*/

app.get('/films', (req, res) => {
    connection.query(SELECT_ALL_FILMS, (err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});
app.get('/films/category', (req, res) => {
    connection.query(SELECT_DOCUMENTARY_FILMS, (err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});

app.get('/films/filter', (req, res) => {
    connection.query(SELECT_FILTER_FILMS, (err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});

app.get('/series', (req, res) => {
    connection.query(SELECT_ALL_SERIES, (err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});
app.get('/series/category', (req, res) => {
    connection.query(SELECT_DOCUMENTARY_SERIES, (err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});

app.get('/series/filter', (req, res) => {
    connection.query(SELECT_FILTER_SERIES, (err, results) => {
    if(err) {
        return res.send(err)
    }
    else{
        return res.json({
            data: results
        })
    }
});
});

const port = process.env.PORT || 3000.
app.listen(3000, () =>{
    console.log(`Products server listening on
     port 3000`)
});

