import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StocksFeatureShellModule } from '@coding-challenge/stocks/feature-shell';
import { StoreModule } from '@ngrx/store';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StocksComponent } from './stocks.component';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [StocksFeatureShellModule,
        SharedUiChartModule,
        StoreModule.forRoot({}),
        NoopAnimationsModule],
      providers: [PriceQueryFacade]
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
    const inputValue = { "symbol": "AAPL", "period": "max" };
    component.stockPickerForm.setValue(inputValue);
    component.fetchQuote();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.fetchQuote).toHaveBeenCalled();
    });
  });
});
