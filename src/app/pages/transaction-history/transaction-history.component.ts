import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { finalize, Subscription } from 'rxjs';
import { TransactionDetailsComponent } from '../../components/transaction-details/transaction-details.component';
import { Transaction } from '../../models/transactions.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly transactionsService = inject(TransactionsService);

  private paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  dataSource: MatTableDataSource<Transaction, MatPaginator> =
    new MatTableDataSource();
  transactionsSub!: Subscription;
  isLoading = false;

  ngOnInit() {
    this.transactionsSub = this.transactionsService.transactions$.subscribe({
      next: (transactions) => {
        this.dataSource.data = transactions;
        this.dataSource.paginator = this.paginator;
      },
    });
    this.getTransactions();
  }

  getTransactions() {
    this.isLoading = true;
    setTimeout(async () => {
      await this.transactionsService.getTransactions();
      this.transactionsService.getTransactionsDetails();

      this.isLoading = false;
    }, 500);
  }

  displayedColumns: string[] = [
    'id',
    'sourceCurrency',
    'targetCurrency',
    'paidValue',
    'transactionDate',
  ];

  openDialog(id: number) {
    const dialogRef = this.dialog.open(TransactionDetailsComponent, {
      width: '500px',
      data: { id },
    });
  }

  ngOnDestroy() {
    if (this.transactionsSub) this.transactionsSub.unsubscribe();
  }
}
