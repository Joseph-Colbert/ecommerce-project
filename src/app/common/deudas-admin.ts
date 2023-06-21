export class DeudasAdmin {
    constructor(public id: string,
        public imageUrl: string,
        public orderTrackingNumber: string,
        public totalQuantity: number,
        public numberOfFeesToPay: number,
        public numberOfFeesPaid: number,
        public payment: number,
        public unitPrice: number,
        public totalPrice: number,
        public totalPriceOnCredit: number,
        public dateCreated: Date,
        public lastUpdated: Date){
    }
}
