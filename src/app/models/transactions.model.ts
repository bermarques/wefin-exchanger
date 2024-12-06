export class Transaction {
  constructor(
    public id: number,
    public sourceCurrency: string,
    public targetCurrency: string,
    public paidValue: number,
    public transactionDate: string,
    public clientName?: string,
    public receivedValue?: number
  ) {}
}
