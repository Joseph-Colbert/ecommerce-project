import { Product } from "./product";

export class CartItemOnCreditPayment {
    id: number;
    orderTrackingNumber: string;

    constructor(product: Product) {
        this.id = product.id;
        this.orderTrackingNumber = ''
    }
}
