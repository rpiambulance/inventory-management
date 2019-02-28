const express = require('express');
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const app = express();
const mock = require('./mock-data.json');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://database:27017/ims', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('Hello World123!'))

app.get('/mock', (req, res) => {
    res.send(mock);
})

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))