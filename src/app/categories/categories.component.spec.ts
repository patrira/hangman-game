import { TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { GlobalStore } from '../shared/data/global-store';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: any;
  let mockGlobalStore: any;

  beforeEach(async () => {
    mockGlobalStore = {
      categoriesNames: jest.fn().mockReturnValue(of(['category1', 'category2', 'category3'])),
      startGame: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CategoriesComponent, HeadingBarComponent, ButtonComponent],
      providers: [
        { provide: GlobalStore, useValue: mockGlobalStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the heading', () => {
    const headingElement = fixture.debugElement.query(By.css('app-heading-bar'));
    expect(headingElement).toBeTruthy();
    expect(headingElement.componentInstance.heading).toBe('Pick a Category');
  });

  it('should display a list of categories', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].componentInstance.label).toBe('CATEGORY1');
    expect(buttons[1].componentInstance.label).toBe('CATEGORY2');
    expect(buttons[2].componentInstance.label).toBe('CATEGORY3');
  });

  it('should call startGame when a category button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    buttons[0].triggerEventHandler('onClick', null);
    expect(mockGlobalStore.startGame).toHaveBeenCalledWith('category1');
  });
});
