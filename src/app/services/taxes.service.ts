import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  private conversionRateSubject = new BehaviorSubject<number>(2.5);
  conversionRate$ = this.conversionRateSubject.asObservable();

  getRate() {
    return this.conversionRateSubject.getValue();
  }

  setRate(newRate: number) {
    this.conversionRateSubject.next(newRate);
  }
}
