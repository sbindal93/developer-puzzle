import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksFeatureShellModule } from '@coding-challenge/stocks/feature-shell';
import { StoreModule } from '@ngrx/store';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksComponent } from './stocks.component';
import { DatePipe } from '@angular/common';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [StocksFeatureShellModule, SharedUiChartModule, StoreModule.forRoot({}), NoopAnimationsModule],
      providers: [PriceQueryFacade,DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call fetchQuote method on onFormDataChange call', () => {
    spyOn(priceQueryFacade, 'fetchQuote').and.stub();
    const formInputValues={ "symbol": "AAPL", "toDate": new Date("01/16/2020"), "fromDate": new Date("01/01/2020") };
    component.stockPickerForm.setValue(formInputValues)
    component.fetchQuote();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalled();
    });
    fixture.whenStable().then(() => {
      expect(component.stockPickerForm.get("toDate").value).toEqual(new Date("01/16/2020"));
    });
  });
});
