import { Component } from '@angular/core';
import { ConversionPanelComponent } from '../conversion-panel/conversion-panel.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ConversionPanelComponent, TransactionHistoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
