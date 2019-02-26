export class Inventory {

    public name: string;
    public items: object;
    public people: Array<string>;

    constructor(invObj: any) {
        this.items = invObj.items;
        this.people = invObj.people;
        this.name = invObj.name;
    }
}
