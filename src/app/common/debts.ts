export class Debts {
    constructor(public id: string,
        public orderTrackingNumber: string,
        public totalQuantity: number,
        public numberOfFeesToPay: number,
        public numberOfFeesPaid: number,
        public totalPrice: number,
        public totalPriceOnCredit: number,
        public dateCreated: Date,
        public lastUpdated: Date){
    }
}
