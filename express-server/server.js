const express = require('express')
//needed for cors, will remove in production
const cors = require('cors');
const app = express()
const mock = require('./mock-data.json');
const port = 3000
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('Hello World123!'))
app.get('/mock', (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(mock));
})

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))