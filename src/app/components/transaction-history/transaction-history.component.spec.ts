import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryComponent } from './transaction-history.component';
import { By } from '@angular/platform-browser';

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have table items', async () => {
    await fixture.whenStable();
    expect(component.dataSource.filteredData.length).toBe(25);
  });
});
