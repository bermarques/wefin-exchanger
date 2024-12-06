import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDetailsComponent } from '../../components/transaction-details/transaction-details.component';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { Transaction } from '../../models/transactions.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private readonly dialog = inject(MatDialog);
  private readonly transactionsService = inject(TransactionsService);

  dataSource: MatTableDataSource<Transaction, MatPaginator> =
    new MatTableDataSource();
  transactionsSub!: Subscription;
  isLoading = false;

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionsSub = this.transactionsService
      .getTransactions()
      .subscribe((transactions) => {
        this.dataSource = new MatTableDataSource(transactions);
        this.dataSource.paginator = this.paginator;
      });
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
