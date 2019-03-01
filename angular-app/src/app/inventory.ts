import { Item } from './item';
import { User } from './user';

export class Inventory {

    public name: string;
    public items: Array<Item>;
    public people: Array<User>;

    constructor(invObj: any) {
        this.items = [];
        // Make actual item objects
        for (const item of invObj.items) {
            this.items.push(new Item(item.name, item.quantity, item.barcode));
        }
        this.people = [];
        for (const person of invObj.people) {
            this.people.push(new User(person.userName, person.firstName, person.lastName, person.email, person.password));
        }
        this.name = invObj.name;
    }
}
