const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const users = require('./users');
const kingdoms = require('./kingdoms');
const phylums = require('./phylums');
const classe = require('./class');
const orders = require('./orders');
const familys = require('./familys');
const genus = require('./genus');
const spicies = require('./spicies');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noah_ark'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(users(connection))
    .use(kingdoms(connection))
    .use(phylums(connection))
    .use(classe(connection))
    .use(orders(connection))
    .use(familys(connection))
    .use(genus(connection))
    .use(spicies(connection))

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});