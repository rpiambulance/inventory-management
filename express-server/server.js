const express = require('express');
//needed for cors, will remove in production
const cors = require('cors');
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const Inventory = require('./schemas/inventory');
const User = require('./schemas/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// We should probably a .then and a .catch, but I didn't bother
mongoose.connect('mongodb://database:27017/ims', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Realistically you would store this as a .env variable
const JSONWTSECRET = 'supersecret';

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => res.send('Hello World123!'))

app.get('/inventory', (req, res) => {
    Inventory.find((err, inventories) => {
        if(err){res.send({success:false, error:err}); return;}
        res.send({success:true,error:"", inventories: inventories});
    });
});

app.get('/user/all', function (req, res) {
    User.find({}, { email:0, password: 0, salt:0, __v:0 },function (err, users) {
        res.send(users);
    })
});

app.post('/inventory/create', (req, res) => {
    // I don't know if we want to switch to IDs or check for iventory names
    jwt.verify(req.body.people[0], JSONWTSECRET, (err, decoded) => {
        // If there's an error we say so
        if (err) {res.send({success:false, error:err}); return;}
        // Adds new inventory to the mongoose database.
        let newInv = new Inventory({ name: req.body.name, items:[], people:[decoded.userName] });
        newInv.save((err, newInv) => {
            if (err) return console.error(err);
            console.log("Successfully saved inventory!");
            res.send({success:true, error:""});
        });
    });
});

app.post('/inventory/additem', (req,res) => {
    Inventory.findOne({_id: req.body.inventory.id}, (err, inventory) => {
        if(err) return console.error(err);
        for (const item of req.body.items) {
            inventory.items.push(item);
        }
        // adds all the new items to it and then saves it
        inventory.save((err, newInv) => {
            if (err) {res.send(false); return console.error(err)};
            console.log("Successfully saved item!");
            res.send(true);
        });
    });
});

app.post('/user/login', (req, res) => {
    // Look in the database for a user with that username
    User.findOne({userName: req.body.userName}, (err, user) => {
        if(!err && !user) {res.send({success: false, error: "No user found!"}); return; }
        if (err) {res.send({success: false, error: err}); return console.error(err)}
        const salt = user.salt;
        const hashedPass = crypto.createHmac('sha256', salt).update(req.body.password).digest('hex');
        // If the hashes equal out
        if(crypto.timingSafeEqual(Buffer.from(hashedPass, 'utf8'), Buffer.from(user.password, 'utf8'))){
            // We sign it with an empty password because the password isn't important
            let usr = {userName: user.userName, firstName: user.firstName, lastName: user.lastName, password: "", email: user.email}
            jwt.sign(usr, JSONWTSECRET, {expiresIn: "2 days"}, (err, token) => {
                if (err) {res.send({success: false, error: err}); return console.error(err)};
                // Return the JSON web token
                res.send({success:true, error: "", token: token});
            });
        }else{
            res.send({success:false, error: "Incorrect username or password!"})
        }
    });
});

app.post('/user/create', (req, res) => {
    User.findOne({userName: req.body.userName}, (err, usr) =>{
        // If a user exits then we shouldn't make another one
        if (usr) { res.send({success:false, error:"User already exists!"}); return; }
        // Salt with a random salt and sha256 because bcrypt is harder
        const salt = crypto.randomBytes(10).toString('hex');
        const hashedPass = crypto.createHmac('sha256', salt).update(req.body.password).digest('hex');
        const user = new User({ userName: req.body.userName, firstName: req.body.firstName, 
            lastName: req.body.lastName, email: req.body.email, password: hashedPass , salt: salt});
        // saves user
        user.save((err) => {
            if (err) {res.send({success: false, error: err}); return console.error(err)};
            console.log("Successfully saved User!");
            res.send({success: true, error: ""});
        });
    });
});

app.post('/user/get', (req, res) => {
    // Verifying the user will give us the token object, there's no real reason to check the database
    jwt.verify(req.body.token, JSONWTSECRET, (err, decoded) => {
        if (err) { res.send({success:false, error:err}); return; }
        res.send({success: true, error: "", user: decoded});
    });
});

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))