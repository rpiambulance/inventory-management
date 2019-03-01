const express = require('express');
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const Inventory = require('./schemas/inventory');
const User = require('./schemas/user');
const app = express();
const mock = require('./mock-data.json');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// We should probably a .then and a .catch, but I didn't bother
mongoose.connect('mongodb://database:27017/ims', { useNewUrlParser: true });
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

app.post('/inventory/create', (req, res) => {
    console.log(req.body);
    // This doesn't do anything right now, but we will fix once register works and stuff
    let user = new User({ userName: req.body.people[0], firstName: '', lastName: '', email:'', password:'' });
    // Adds new inventory to the mongoose database.
    let newInv = new Inventory({ name: req.body.name, items:[], people:[user] });
    newInv.save((err, newInv) => {
        if (err) return console.error(err);
        console.log("Successfully saved inventory!");
    });
});

app.post('/inventory/additem', (req,res) => {
    console.log(req.body.inventory.name);
    Inventory.findOne({name: req.body.inventory.name}, (err, inventory) => {
        if(err) return console.error(err);
        for (const item of req.body.items) {
            inventory.items.push(item);
        }
        // adds all the new items to it and then saves it
        inventory.save((err, newInv) => {
            if (err) {res.send(false); return console.error(err)};
            console.log("Successfully saved inventory!");
            res.send(true);
        });
    });
});

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))