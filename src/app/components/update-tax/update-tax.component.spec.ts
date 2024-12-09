import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaxComponent } from './update-tax.component';
import { By } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateTaxComponent', () => {
  let component: UpdateTaxComponent;
  let fixture: ComponentFixture<UpdateTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTaxComponent, BrowserAnimationsModule],
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

    fixture = TestBed.createComponent(UpdateTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show for changing tax rate', () => {
    const inputEl = fixture.debugElement.query(
      By.css('input[formcontrolname="rate"]')
    );
    expect(inputEl).toBeTruthy();
  });
});
