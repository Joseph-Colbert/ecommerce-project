import { CartItemOnCredit } from "./cart-item-on-credit";


export class OrderItemOnCredit {
    imageUrl!: string;
    unitPrice!: number;
    unitPriceOnCredit!: number;
    monthlyFees!: number;
    numberOfFees!: number;
    quantity!: number;
    productId!: number;

    constructor(cartItem:CartItemOnCredit) {
        this.imageUrl = cartItem.imageUrl;
        this.unitPrice = cartItem.unitPrice;
        this.unitPriceOnCredit = cartItem.unitPriceOnCredit;
        this.monthlyFees = cartItem.monthlyFees;
        this.numberOfFees = cartItem.numberOfFees;
        this.quantity = cartItem.quantity;
        
        this.productId = cartItem.id;
        
    }   
}
