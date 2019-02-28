export class Item {
    public name: string;
    public quantity: number;
    public barcode: number;
    constructor(name: string, quant: number, barc?: number) {
        this.name = name;
        this.quantity = quant;
        this.barcode = barc;
    }
}
