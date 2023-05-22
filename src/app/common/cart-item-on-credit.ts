import { Product } from "./product";

export class CartItemOnCredit {
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    unitPriceOnCredit!: number;
    monthlyFees!: number;
    numberOfFees!: number;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        /*this.unitPriceOnCredit = product.unitPriceOnCredit;
        this.monthlyFees = product.monthlyFees;
        this.numberOfFees = product.numberOfFees;*/

        this.quantity = 1;

    }
}
