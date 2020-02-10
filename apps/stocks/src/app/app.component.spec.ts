import { TestBed, async ,ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';  
import { DebugElement } from '@angular/core';
describe('AppComponent', () => {
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    debugElement = fixture.debugElement;
    app = debugElement.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    let compiled = debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to stocks!');
  });
});
