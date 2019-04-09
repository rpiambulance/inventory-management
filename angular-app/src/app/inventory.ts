import { Item } from './item';

export class Inventory {

    public id: string;
    public name: string;
    public items: Array<Item>;
    public people: Array<string>;
    public owner: string;

    constructor(invObj: any) {
        this.items = [];
        // Make actual item objects
        for (const item of invObj.items) {
            this.items.push(new Item(item.name, item.quantity, item.barcode));
        }
        this.people = invObj.people;
        this.name = invObj.name;
        if (invObj.id) {
            this.id = invObj.id;
        } else {
            this.id = invObj._id;
        }
        this.owner = invObj.owner;
        // this.id = invObj._id;
    }
}
