import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { greaterThanZeroValidator } from '../../utils/validateGreaterThanZero';

@Component({
  selector: 'app-update-tax',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-tax.component.html',
  styleUrl: './update-tax.component.scss',
})
export class UpdateTaxComponent implements OnInit {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA) as {
    conversionRate: number;
    sourceCurrency: string;
    targetCurrency: string;
  };
  newRate!: number;
  taxForm!: FormGroup;
  targetCurrency: string = '';
  sourceCurrency: string = '';

  ngOnInit() {
    this.newRate = this.data.conversionRate;
    this.sourceCurrency = this.data.sourceCurrency;
    this.targetCurrency = this.data.targetCurrency;

    this.taxForm = new FormGroup({
      rate: new FormControl(this.newRate, [
        Validators.required,
        greaterThanZeroValidator,
      ]),
    });
  }

  checkError(): string {
    const formControl = this.taxForm?.get('rate');

    if (formControl?.hasError('required')) {
      return 'Valor obrigatório';
    }

    if (formControl?.hasError('greaterThanZero')) {
      return 'Valor deve ser maior que 0';
    }
    return '';
  }

  onSave(): void {
    this.newRate = this.taxForm.get('rate')?.value || 0;
    this.dialogRef.close(this.newRate);
  }
}
