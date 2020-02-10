import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  subscription = new Subscription();

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() { this.onFormDataChange() }

  fetchQuote() {
    let { symbol, period } = this.stockPickerForm.value;
    this.priceQuery.fetchQuote(symbol, period);
  };
  onFormDataChange(): void {
    this.subscription = this.stockPickerForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        if (this.stockPickerForm.valid) {
          this.fetchQuote()
        }
      });
  };
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}
