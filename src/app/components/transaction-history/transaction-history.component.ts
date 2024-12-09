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
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { Transaction } from '../../models/transactions.model';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { unformatTransactionDate } from '../../utils/unformatTransactionDate';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSortModule,
  ],
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
    this.dataSource.sortingDataAccessor = (row, column) => {
      console.log(
        row.transactionDate,
        unformatTransactionDate(row.transactionDate)
      );
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
    console.log(sortState);
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

  ngOnDestroy() {
    if (this.transactionsSub) this.transactionsSub.unsubscribe();
  }
}
