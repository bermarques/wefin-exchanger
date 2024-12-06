import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize, Subscription } from 'rxjs';
import { Transaction } from '../../models/transactions.model';
import { TransactionsService } from '../../services/transactions/transactions.service';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
  private readonly data = inject(MAT_DIALOG_DATA) as { id: number };
  private readonly transactionsService = inject(TransactionsService);

  transaction?: Transaction;
  isLoading = false;

  transactionsSub!: Subscription;

  ngOnInit() {
    this.isLoading = true;
    setTimeout(async () => {
      this.transactionsSub = await this.transactionsService
        .getTransactionDetail(this.data.id)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: (transaction) => {
            this.transaction = transaction;
          },
        });
    }, 500);
  }

  ngOnDestroy() {
    if (this.transactionsSub) this.transactionsSub.unsubscribe();
  }
}
