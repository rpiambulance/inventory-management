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

// the different routers used for middleware
const apiRouter = express.Router();
const inventoryRouter = express.Router();
const userRouter = express.Router();

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


// all endpoints related to publicly available data
app.use('/api',apiRouter);

// /api/inventory returns all inventories in the database
apiRouter.get('/inventory', (req,res)=>{
    if(req.query.id){
        Inventory.findOne({_id: req.query.id}, (err, inventory) => {
            if(err){res.send({success:false, error:err}); return;}
            res.send({success:true,error:"", inventory: inventory});
        })
    }else{
        Inventory.find({}, {}, (err, inventories) => {
            if(err){res.send({success:false, error:err}); return;}
            res.send({success:true,error:"", inventories: inventories});
        });
    }
});

// /api/users returns all users in the database
apiRouter.get('/users', (req,res)=>{
    User.find({}, { email:0, password:0, salt:0, __v:0 }, (err, users)=>{
      if(err){res.send({success:false, error:err}); return;}
      res.send({success:true,error:"", users, users});
    });
});

// TODO
// endpoint responsible for an overview of all items
// to be determined if implemented
apiRouter.get('/items', (req,res)=>{
  res.send({success:true,error:"TODO"});
});

// TODO
// endpoint responsible for creating a temporary read-only endpoint to view an inv
// to be determined if implemented
apiRouter.get('/share', (req,res)=>{
  res.send({success:true,error:"TODO"});
});

// all endpoints related to inventories
app.use('/inventory',inventoryRouter);

// /inventory/create creates a new inventory by name
inventoryRouter.post('/create', (req,res)=>{
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

// /inventory/additem adds items to inventory by id
inventoryRouter.post('/additem', (req,res) => {
    Inventory.findOne({_id: req.body.inventory.id}, (err, inventory) => {
        if(err) return console.error(err);
        for (let item of inventory.items){
            for (let i = req.body.items.length - 1; i >= 0; i--) {
                // If it's a duplicate remove it and add to the current quantity
                if (req.body.items[i].name == item.name) { 
                    item.quantity += req.body.items[i].quantity;
                    req.body.items.splice(i, 1);
                }
            }
        }
        for (const item of req.body.items) {
            inventory.items.push(item);
        }
        // adds all the new items to it and then saves it
        inventory.save((err, newInv) => {
            if (err) {res.send(false); return console.error(err)};
            console.log("Successfully saved item!");
            res.send({success:true, items: newInv.items});
        });
    });
});

// TODO: give it a better, more unique endpoint
// /inventory/:id responsible for adding a user to have access
inventoryRouter.post('/:id', (req,res)=>{
    var invId = req.params.id;
    Inventory.findOne({ _id: invId }, (err, inv) => {
        if (err) return console.log(err);
        inv.people.push(req.body.user)

        inv.save((err) => {
            if (err) { res.send({ success: false, error: err }); return console.error(err) };
            console.log("Successfully added a new user to the inventory!");
            res.send({ success: true, error: "" });
        })
    })
});


app.use('/user', userRouter);

// /user/login the endpoint used to verify if credentials are in the system
userRouter.post('/login', (req, res) => {
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

// /user/create endpoint used to either store a new user or check if already exist
userRouter.post('/create', (req, res) => {
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

// /user/get endpoint used internally to verify the user
userRouter.post('/get', (req, res) => {
    // Verifying the user will give us the token object, there's no real reason to check the database
    jwt.verify(req.body.token, JSONWTSECRET, (err, decoded) => {
        if (err) { res.send({success:false, error:err}); return; }
        res.send({success: true, error: "", user: decoded});
    });
});


app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`))
