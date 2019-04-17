const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventorySchema = new Schema ({
    name: String,
    items: [{name: String, quantity: Number, barcode: Number}],
    people: [{ type: String }],
    owner: String
});

const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;