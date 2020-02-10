import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { stockConstant } from './stocks.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit{
  
  stockPickerForm: FormGroup;
  formLabel = stockConstant.formConstLabel;
  quotes$ = this.priceQuery.priceQueries$;
  timePeriods = stockConstant.timeperiods;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      let { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
