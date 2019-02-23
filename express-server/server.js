const express = require('express')
const app = express()
const mock = require('./mock-data.json');
const port = 3000

app.get('/', (req, res) => res.send('Hello World123!'))
app.get('/mock', (req, res) => {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(mock));
})

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))