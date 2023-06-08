import { Product } from "./product";

export class CartItemOnCredit {
    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    unitPriceOnCredit!: number;
    monthlyFees!: number;
    numberOfFees!: number;
    payment!: number;
   

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
   
        this.quantity = 1;

        this.unitPriceOnCredit = 0;
        this.monthlyFees = 0;
        this.numberOfFees = 0;
        this.payment = 0;


    }
    
    
    
    
    
    
    
    
}
