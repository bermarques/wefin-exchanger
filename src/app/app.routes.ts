import { Routes } from '@angular/router';
import { ConversionPanelComponent } from './pages/conversion-panel/conversion-panel.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/conversion-panel', pathMatch: 'full' },
  { path: 'conversion-panel', component: ConversionPanelComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
];
