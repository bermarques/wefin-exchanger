import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './conversion-panel.component.html',
  styleUrl: './conversion-panel.component.scss',
})
export class ConversionPanelComponent implements OnInit {
  conversionForm!: FormGroup;
  conversionRate = 2.5;
  convertedAmount = 0;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.conversionForm = new FormGroup({
      amount: new FormControl(0, Validators.required),
      from: new FormControl('tibar', Validators.required),
      to: new FormControl('gold', Validators.required),
    });
  }

  convertCurrency() {
    this.convertedAmount =
      (this.conversionForm.get('amount')?.value || 0) * this.conversionRate;
  }
}
