import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaxComponent } from '../../components/update-tax/update-tax.component';
import { TaxesService } from '../../services/taxes.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-conversion-panel',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './conversion-panel.component.html',
  styleUrl: './conversion-panel.component.scss',
})
export class ConversionPanelComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly taxesService = inject(TaxesService);

  taxesSub!: Subscription;

  conversionForm!: FormGroup;
  conversionRate = 2.5;
  amount = 0;
  convertedAmount = 0;

  ngOnInit() {
    this.initForm();

    this.taxesSub = this.taxesService.conversionRate$.subscribe((rate) => {
      this.conversionRate = rate;
    });
  }

  initForm() {
    this.conversionForm = new FormGroup({
      amount: new FormControl(0, Validators.required),
      from: new FormControl('Ouro Real', Validators.required),
      to: new FormControl('Tibar', Validators.required),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateTaxComponent, {
      data: { conversionRate: this.conversionRate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taxesService.setRate(result);
        this.convertCurrency();
      }
    });
  }

  convertCurrency() {
    this.amount = this.conversionForm.get('amount')?.value || 0;
    this.convertedAmount = this.amount * this.conversionRate;
  }

  swapCurrency() {
    const fromValue = this.conversionForm.get('from')?.value || 'Ouro Real';
    const toValue = this.conversionForm.get('to')?.value || 'Tibar';

    this.conversionForm.get('from')?.setValue(toValue);
    this.conversionForm.get('to')?.setValue(fromValue);

    this.conversionRate = 1 / this.conversionRate;
    this.convertCurrency();
  }

  getCurrentCurrency() {
    return this.conversionForm.get('from')?.value || 'Ouro Real';
  }

  getTargetCurrency() {
    return this.conversionForm.get('to')?.value || 'Tibar';
  }

  ngOnDestroy() {
    this.taxesSub.unsubscribe();
  }
}
