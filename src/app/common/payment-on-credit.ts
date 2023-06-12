import { Customer } from "./customer";
import { OrderItemOnCredit } from "./order-item-on-credit";
import { OrderOnCredit } from "./order-on-credit";

export class PaymentOnCredit {
    customer!: Customer;
    orderOnCredit!: OrderOnCredit;
    orderItemsOnCredit!: OrderItemOnCredit[];
}
