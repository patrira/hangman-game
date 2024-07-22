import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { GlobalStore } from '../shared/data/global-store';
import { of } from 'rxjs';


const mockGlobalStore = {
  categoriesNames: jest.fn().mockReturnValue(['Category1', 'Category2', 'Category3']),
  startGame: jest.fn()
};

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoriesComponent,
        HeadingBarComponent,
        ButtonComponent
      ],
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

  it('should render the heading bar with the correct heading', () => {
    const headingBar = fixture.debugElement.nativeElement.querySelector('app-heading-bar');
    expect(headingBar).toBeTruthy();
    expect(headingBar.getAttribute('heading')).toBe('Pick a Category');
  });

  it('should render the correct number of category buttons', () => {
    const buttonElements = fixture.debugElement.nativeElement.querySelectorAll('app-button');
    expect(buttonElements.length).toBe(3); 
  });

  it('should render buttons with correct labels and ariaLabels', () => {
    const buttonElements = fixture.debugElement.nativeElement.querySelectorAll('app-button');
    const categories = ['Category1', 'Category2', 'Category3'];

    buttonElements.forEach((button: HTMLElement, index: number) => {
      expect(button.getAttribute('label')).toBe(categories[index].toUpperCase());
      expect(button.getAttribute('ariaLabel')).toBe(`Select the ${categories[index]} and start a game`);
    });
  });

  it('should call store.startGame with correct category on button click', () => {
    const buttonElements = fixture.debugElement.nativeElement.querySelectorAll('app-button');
    const categories = ['Category1', 'Category2', 'Category3'];

    buttonElements.forEach((button: HTMLElement, index: number) => {
      button.dispatchEvent(new Event('click'));
      expect(mockGlobalStore.startGame).toHaveBeenCalledWith(categories[index]);
    });
  });
});
