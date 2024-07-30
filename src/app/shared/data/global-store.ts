import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Categories, Category } from '../models/category.model';
import { Letter } from '../models/letter.model';
import { Option } from '../models/option.model';
import { MenuConfig } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private state = new BehaviorSubject<GlobalState>({
    categories: {},
    selectedCategory: null,
    selectedOption: null,
    attemptsLeft: 8,
    attemptedLetters: [],
    menuConfig: { header: '', menuItems: [] },
  });

  state$ = this.state.asObservable();

  private getState() {
    return this.state.getValue();
  }

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  private setState(newState: Partial<GlobalState>) {
    this.state.next({ ...this.getState(), ...newState });
  }

  loadCategories() {
    this.http.get<{ categories: Categories }>('data/data.json').pipe(
      tap(({ categories }) => this.setState({ categories }))
    ).subscribe();
  }

  startGame(category: Category) {
    const state = this.getState();
    const option = state.categories[category][
      Math.floor(Math.random() * state.categories[category].length)
    ];

    this.setState({
      selectedCategory: category,
      categories: {
        ...state.categories,
        [category]: state.categories[category].map((el) =>
          el.name === option.name ? { ...option, selected: true } : el
        ),
      },
      selectedOption: option.name.toUpperCase().replaceAll(`'`, ''),
      attemptsLeft: 8,
      attemptedLetters: [],
      menuConfig: { ...state.menuConfig },
    });
  }

  attemptLetter(letter: Letter) {
    const state = this.getState();
    if (state.attemptedLetters.includes(letter) || this.isMenuOpen()) return;

    const newAttemptedLetters = [...state.attemptedLetters, letter];
    const attemptsLeft = state.selectedOption?.includes(letter)
      ? state.attemptsLeft
      : state.attemptsLeft - 1;

    this.setState({
      attemptedLetters: newAttemptedLetters,
      attemptsLeft: attemptsLeft,
    });

    if (this.getGameOutcome()) {
      this.openMenu();
    }
  }

  quitGame() {
    this.setState({
      ...initialState,
      categories: this.getState().categories,
    });
    this.loadCategories();
  }

  openMenu() {
    this.setState({
      menuConfig: {
        header: this.getGameOutcome() === 'LOSE'
          ? 'You Lose'
          : this.getGameOutcome() === 'WIN'
          ? 'You Win'
          : 'Paused',
        menuItems: [
          !this.getGameOutcome()
            ? {
                label: 'Continue',
                ariaLabel: 'Resume the game and close menu',
                onClick: () => this.closeMenu(),
              }
            : {
                label: 'Play Again!',
                ariaLabel: 'Play again with the same category',
                routerLink:
                  this.getOptionsAvailable().length === 0
                    ? '/categories'
                    : undefined,
                onClick: () =>
                  this.getOptionsAvailable().length === 0
                    ? this.quitGame()
                    : this.startGame(this.getState().selectedCategory!),
              },
          {
            label: 'New Category',
            ariaLabel: 'Pick a new category and start another game',
            routerLink: '/categories',
            onClick: () => this.quitGame(),
          },
          {
            label: 'Quit Game',
            ariaLabel: 'Quit the game and go to the main menu',
            routerLink: '/main-menu',
            onClick: () => this.quitGame(),
            buttonStyleClass: 'btn--secondary',
          },
        ],
      },
    });
  }

  closeMenu() {
    this.setState({ menuConfig: { ...initialState.menuConfig } });
  }

  private isMenuOpen(): boolean {
    return this.getState().menuConfig.menuItems.length > 0;
  }

  private getGameOutcome(): 'WIN' | 'LOSE' | null {
    const state = this.getState();
    if (state.attemptsLeft === 0) return 'LOSE';
    if (
      (state.selectedOption?.split('') || []).every((el) =>
        state.attemptedLetters.includes(el as Letter)
      )
    )
      return 'WIN';
    return null;
  }

  private getOptionsAvailable(): Option[] {
    const state = this.getState();
    if (state.selectedCategory) {
      return state.categories[state.selectedCategory].filter(
        (opt) => !opt.selected
      );
    }
    return [];
  }
}

const initialState: GlobalState = {
  categories: {},
  selectedCategory: null,
  selectedOption: null,
  attemptsLeft: 8,
  attemptedLetters: [],
  menuConfig: { header: '', menuItems: [] },
};

type GlobalState = {
  categories: Categories;
  selectedCategory: Category | null;
  selectedOption: Option['name'] | null;
  attemptsLeft: number;
  attemptedLetters: Letter[];
  menuConfig: MenuConfig;
};
