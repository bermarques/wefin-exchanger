import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  private conversionRate$ = new BehaviorSubject<number>(2.5);
  conversionRate = this.conversionRate$.asObservable();

  getRate() {
    return this.conversionRate$.getValue();
  }

  setRate(newRate: number) {
    this.conversionRate$.next(newRate);
  }
}
