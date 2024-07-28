import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-root></app-root>`,
})
class TestHostComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const routerOutletDebugElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutletDebugElement).not.toBeNull();
  });

  it('should contain the route animations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const mainElement = compiled.querySelector('main');
    expect(mainElement?.getAttribute('[@routeAnimations]')).toBeDefined();
  });

 
});
