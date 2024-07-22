import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { GameToolbarComponent } from './ui/game-toolbar/game-toolbar.component';
import { GameKeyboardComponent } from './ui/game-keyboard/game-keyboard.component';
import { GameBoardComponent } from './ui/game-board/game-board.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { GlobalStore } from '../shared/data/global-store';
import { of } from 'rxjs';

// Mock GlobalStore
const mockGlobalStore = {
  selectedCategory: jest.fn().mockReturnValue('Category1'),
  attemptsLeft: jest.fn().mockReturnValue(3),
  selectedOption: jest.fn().mockReturnValue('Option1'),
  attemptedLetters: jest.fn().mockReturnValue(['A', 'B']),
  openMenu: jest.fn(),
  menuOpen: jest.fn().mockReturnValue(true),
  menuConfig: {
    header: jest.fn().mockReturnValue('Menu Header'),
    menuItems: jest.fn().mockReturnValue(['Item1', 'Item2'])
  },
  attemptLetter: jest.fn()
};

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GameComponent,
        GameToolbarComponent,
        GameKeyboardComponent,
        GameBoardComponent,
        ButtonComponent,
        MenuComponent
      ],
      providers: [
        { provide: GlobalStore, useValue: mockGlobalStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the game toolbar with correct inputs', () => {
    const toolbar = fixture.debugElement.nativeElement.querySelector('app-game-toolbar');
    expect(toolbar).toBeTruthy();
    expect(toolbar.getAttribute('selectedCategory')).toBe('Category1');
    expect(toolbar.getAttribute('attemptsLeft')).toBe('3');
  });

  it('should render the game board with correct inputs', () => {
    const board = fixture.debugElement.nativeElement.querySelector('app-game-board');
    expect(board).toBeTruthy();
    expect(board.getAttribute('selectedOption')).toBe('Option1');
    expect(board.getAttribute('attemptedLetters')).toBe('A,B');
  });

  it('should render the game keyboard with correct inputs', () => {
    const keyboard = fixture.debugElement.nativeElement.querySelector('app-game-keyboard');
    expect(keyboard).toBeTruthy();
    expect(keyboard.getAttribute('attemptedLetters')).toBe('A,B');
  });

  it('should render the menu with correct inputs', () => {
    const menu = fixture.debugElement.nativeElement.querySelector('app-menu');
    expect(menu).toBeTruthy();
    expect(menu.classList).toContain('menu--secondary');
    expect(menu.getAttribute('overlay')).toBe('true');
    expect(menu.getAttribute('isOpen')).toBe('true');
    expect(menu.getAttribute('header')).toBe('Menu Header');
    expect(menu.getAttribute('menuItems')).toBe('Item1,Item2');
  });

  it('should call store.openMenu on menu click', () => {
    const toolbar = fixture.debugElement.nativeElement.querySelector('app-game-toolbar');
    toolbar.dispatchEvent(new Event('onMenuClick'));
    expect(mockGlobalStore.openMenu).toHaveBeenCalled();
  });

  it('should call store.attemptLetter on key click', () => {
    const keyboard = fixture.debugElement.nativeElement.querySelector('app-game-keyboard');
    keyboard.dispatchEvent(new CustomEvent('onKeyClick', { detail: 'A' }));
    expect(mockGlobalStore.attemptLetter).toHaveBeenCalledWith('A');
  });
});
