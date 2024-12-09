import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsComponent } from './transaction-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import formatTransactionDate from '../../utils/formatTransactionDate';

describe('TransactionDetailsComponent', () => {
  let component: TransactionDetailsComponent;
  let fixture: ComponentFixture<TransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            sourceCurrency: 'Tibar',
            targetCurrency: 'Ouro Real',
            paidValue: 6,
            clientName: 'João Anão',
            transactionDate: formatTransactionDate(new Date()),
            receivedValue: 15,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
