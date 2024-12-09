import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionPanelComponent } from './conversion-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UpdateTaxComponent } from '../update-tax/update-tax.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ConversionPanelComponent', () => {
  let component: ConversionPanelComponent;
  let fixture: ComponentFixture<ConversionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConversionPanelComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            conversionRate: 2.5,
            sourceCurrency: 'Ouro Real',
            targetCurrency: 'Tibar',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should swap currencies when swap button is clicked', () => {
    const sourceCurrencyEl = fixture.debugElement.query(
      By.css('input[formcontrolname="sourceCurrency"]')
    ).nativeElement;
    const targetCurrencyEl = fixture.debugElement.query(
      By.css('input[formcontrolname="targetCurrency"]')
    ).nativeElement;
    const swapButtonEl = fixture.debugElement.query(
      By.css('button.swap-button')
    );
    swapButtonEl.triggerEventHandler('click');
    fixture.detectChanges();
    expect(sourceCurrencyEl.value).toBe('Tibar');
    expect(targetCurrencyEl.value).toBe('Ouro Real');
  });

  it('should create a transaction for Ouro Real to Tibar', () => {
    const amountEl = fixture.debugElement.query(
      By.css('input[formcontrolname="amount"]')
    );
    amountEl.nativeElement.value = 2;
    amountEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement
      .query(By.css('button.convert-button'))
      .triggerEventHandler('click');
    expect(component.convertedAmount).toBe(5);
  });

  it('should swap currencies then create a transaction', () => {
    const amountEl = fixture.debugElement.query(
      By.css('input[formcontrolname="amount"]')
    );
    amountEl.nativeElement.value = 2;
    amountEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement
      .query(By.css('button.convert-button'))
      .triggerEventHandler('click');

    fixture.debugElement
      .query(By.css('button.swap-button'))
      .triggerEventHandler('click');

    fixture.detectChanges();

    expect(component.convertedAmount).toBe(0.8);
  });
});
