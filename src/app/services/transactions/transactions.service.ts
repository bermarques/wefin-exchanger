import { Injectable } from '@angular/core';
import { TRANSACTION_LIST } from './transactions.mock';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Transaction } from '../../models/transactions.model';
import { TRANSACTION_DETAILS } from './transactionDetails.mock';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private transactionsDetailsSubject = new BehaviorSubject<Transaction[]>([]);

  transactions$ = this.transactionsSubject.asObservable();
  transactionsDetails$ = this.transactionsDetailsSubject.asObservable();

  async getTransactions(page = 1) {
    this.transactionsSubject.next(TRANSACTION_LIST);
  }

  addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction = new Transaction(
      this.transactionsSubject.value.length + 1,
      transaction.sourceCurrency,
      transaction.targetCurrency,
      transaction.paidValue,
      transaction.transactionDate,
      transaction.clientName,
      transaction.receivedValue
    );

    this.transactionsSubject.next([
      ...this.transactionsSubject.value,
      newTransaction,
    ]);
    this.transactionsDetailsSubject.next([
      ...this.transactionsDetailsSubject.value,
      newTransaction,
    ]);
  }

  async getTransactionsDetails() {
    this.transactionsDetailsSubject.next(TRANSACTION_DETAILS);
  }

  getTransactionDetail(id: number) {
    return this.transactionsDetailsSubject.value.find(
      (transaction) => transaction.id === id
    )!;
  }
}
