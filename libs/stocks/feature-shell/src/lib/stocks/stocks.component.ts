import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  providers: [DatePipe]
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  subscription: Subscription = new Subscription();
  maxDate = new Date();
  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade, private datePipe: DatePipe) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.subscription = this.stockPickerForm.get("fromDate").valueChanges
      .subscribe(
        fromDate => {
          let toDate = this.stockPickerForm.get("toDate").value;
          if (fromDate != null && toDate != null && fromDate.getTime() > toDate.getTime()) {
            this.stockPickerForm.patchValue({
              toDate: fromDate
            });
          }
        });
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const period = "max";
      let toDate = this.datePipe.transform(this.stockPickerForm.get("toDate").value, "yyyy-MM-dd");
      let fromDate = this.datePipe.transform(this.stockPickerForm.get("fromDate").value, "yyyy-MM-dd");
      let { symbol } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period, new Date(toDate), new Date(fromDate));
    }
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
