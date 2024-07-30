import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { GlobalStore } from '../shared/data/global-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let store: jest.Mocked<InstanceType<typeof GlobalStore>>;

  beforeEach(async () => {
    const storeMock = {
      categoriesNames: jest.fn().mockReturnValue(['Category1', 'Category2', 'Category3']),
      startGame: jest.fn(),
    } as unknown as jest.Mocked<InstanceType<typeof GlobalStore>>;

    await TestBed.configureTestingModule({
      imports: [
        CategoriesComponent,
        HeadingBarComponent,
        ButtonComponent,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: GlobalStore, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(GlobalStore) as jest.Mocked<InstanceType<typeof GlobalStore>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading bar with correct heading', () => {
    const headingBar = fixture.debugElement.query(By.css('app-heading-bar'));
    expect(headingBar.componentInstance.heading).toBe('Pick a Category');
  });

  it('should render the correct number of categories', () => {
    const categoryButtons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(categoryButtons.length).toBe(3);
  });

  it('should render category buttons with correct labels and aria labels', () => {
    const categoryButtons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(categoryButtons[0].componentInstance.label).toBe('CATEGORY1');
    expect(categoryButtons[1].componentInstance.label).toBe('CATEGORY2');
    expect(categoryButtons[2].componentInstance.label).toBe('CATEGORY3');
    
  });

  it('should call startGame with the correct category when a button is clicked', () => {
    const categoryButtons = fixture.debugElement.queryAll(By.css('app-button'));
    categoryButtons[0].triggerEventHandler('onClick', null);
    expect(store.startGame).toHaveBeenCalledWith('Category1');
    categoryButtons[1].triggerEventHandler('onClick', null);
    expect(store.startGame).toHaveBeenCalledWith('Category2');
    categoryButtons[2].triggerEventHandler('onClick', null);
    expect(store.startGame).toHaveBeenCalledWith('Category3');
  });
});
