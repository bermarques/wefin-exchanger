import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Transaction } from '../../models/transactions.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { unformatTransactionDate } from '../../utils/unformatTransactionDate';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly transactionsService = inject(TransactionsService);
  private readonly liveAnnouncer = inject(LiveAnnouncer);

  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.sortingDataAccessor = (row, column) => {
      if (column === 'transactionDate') {
        return unformatTransactionDate(row.transactionDate).getTime();
      }
      return row[column as keyof Transaction] as string;
    };
  }

  dataSource: MatTableDataSource<Transaction, MatPaginator> =
    new MatTableDataSource();
  transactionsSub!: Subscription;
  isLoading = false;
  filters = {
    sourceCurrency: '',
    targetCurrency: '',
    transactionDate: null,
    minValue: null,
    maxValue: null,
  };

  ngOnInit() {
    this.transactionsSub = this.transactionsService.transactions$.subscribe({
      next: (transactions) => {
        this.dataSource.data = transactions;
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(TransactionDetailsComponent, {
      width: '500px',
      data: { id },
    });
  }

  customFilterPredicate() {
    return (data: Transaction, filter: string): boolean => {
      const filters = JSON.parse(filter);

      if (
        filters.sourceCurrency &&
        data.sourceCurrency !== filters.sourceCurrency
      ) {
        return false;
      }

      if (
        filters.targetCurrency &&
        data.targetCurrency !== filters.targetCurrency
      ) {
        return false;
      }

      if (
        filters.transactionDate &&
        unformatTransactionDate(data.transactionDate).toDateString() !==
          new Date(filters.transactionDate).toDateString()
      ) {
        return false;
      }

      if (filters.minValue !== null && data.paidValue < filters.minValue) {
        return false;
      }
      if (filters.maxValue !== null && data.paidValue > filters.maxValue) {
        return false;
      }

      return true;
    };
  }

  applyFilter() {
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  ngOnDestroy() {
    if (this.transactionsSub) this.transactionsSub.unsubscribe();
  }
}
