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
export class TransactionDetailsComponent implements OnInit {
  private readonly data = inject(MAT_DIALOG_DATA) as { id: number };
  private readonly transactionsService = inject(TransactionsService);

  transaction?: Transaction;
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.transaction = this.transactionsService.getTransactionDetail(
        this.data.id
      );
      this.isLoading = false;
    }, 500);
  }

  getUsedTax() {
    const tax =
      (this.transaction?.receivedValue || 0) -
        (this.transaction?.paidValue || 0) || 1;

    if (this.transaction) {
      return (
        (this.transaction?.receivedValue || 0) /
        (this.transaction?.paidValue || 0)
      );
    }
    return 0;
  }
}
