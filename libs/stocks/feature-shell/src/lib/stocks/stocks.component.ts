import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { stockConstant } from './stocks.constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit,OnDestroy{
  
  stockPickerForm: FormGroup;
  error :string;
  formLabel = stockConstant.formConstLabel;
  quotes$ = this.priceQuery.priceQueries$;
  quotesError$ = this.priceQuery.priceQueryError$;
  timePeriods = stockConstant.timeperiods;
  subscription = new Subscription();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.subscription=this.quotesError$.subscribe(priceQueryError => {
      this.error = priceQueryError ? priceQueryError.error : null;
    });
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      let { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  };
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}
