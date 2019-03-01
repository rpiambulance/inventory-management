const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

const InventorySchema = new Schema ({
    name: String,
    items: [{name: String, quantity: Number, barcode: Number}],
    people: [{ type: 'ObjectId', ref: 'User' }]
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;