import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA } from './mockedData';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    'id',
    'sourceCurrency',
    'targetCurrency',
    'transactionValue',
    'transactionDate',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
}
