import { Item } from './item';

export class Inventory {

    public name: string;
    public items: Array<Item>;
    // PRobably change this to Ids as we don't want to store users as the user object has a password
    public people: Array<string>;

    constructor(invObj: any) {
        this.items = [];
        // Make actual item objects
        for (const item of invObj.items) {
            this.items.push(new Item(item.name, item.quantity, item.barcode));
        }
        this.people = invObj.people;
        this.name = invObj.name;
    }
}
