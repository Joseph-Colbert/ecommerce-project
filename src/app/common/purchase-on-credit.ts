import { Address } from "./address";
import { Customer } from "./customer";
import { OrderItemOnCredit } from "./order-item-on-credit";
import { OrderOnCredit } from "./order-on-credit";

export class PurchaseOnCredit {
    customer!: Customer;
    shippingAddress!: Address;
    orderOnCredit!: OrderOnCredit;
    orderItems!: OrderItemOnCredit[];
}
