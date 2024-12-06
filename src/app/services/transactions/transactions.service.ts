import { Injectable } from '@angular/core';
import { TRANSACTION_LIST } from './transactions.mock';
import { Observable, of } from 'rxjs';
import { Transaction } from '../../models/transactions.model';
import { TRANSACTION_DETAILS } from './transactionDetails.mock';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private transactionList = TRANSACTION_LIST;
  private transactionsDetails = TRANSACTION_DETAILS;

  getTransactions(): Observable<Transaction[]> {
    return of(this.transactionList);
  }

  getTransactionDetail(id: number): Observable<Transaction> {
    return of(
      this.transactionsDetails.find((transaction) => transaction.id === id)!
    );
  }
}
