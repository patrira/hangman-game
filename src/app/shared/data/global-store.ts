import { Injectable, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Categories, Category } from '../models/category.model';
import { Letter } from '../models/letter.model';
import { Option } from '../models/option.model';
import { MenuConfig } from '../models/menu.model';

type GlobalState = {
  categories: Categories;
  selectedCategory: Category | null;
  selectedOption: Option['name'] | null;
  attemptsLeft: number;
  attemptedLetters: Letter[];
  menuConfig: MenuConfig;
};

const initialState: GlobalState = {
  categories: {},
  selectedCategory: null,
  selectedOption: null,
  attemptsLeft: 8,
  attemptedLetters: [],
  menuConfig: { header: '', menuItems: [] },
};

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  private state$ = new BehaviorSubject<GlobalState>(initialState);

  categoriesNames$ = this.state$.pipe(
    map(state => Object.keys(state.categories))
  );

  optionsAvailable$ = this.state$.pipe(
    map(state =>
      state.selectedCategory
        ? state.categories[state.selectedCategory].filter(opt => !opt.selected)
        : []
    )
  );

  toGuessLetters$ = this.state$.pipe(
    map(state =>
      state.selectedOption
        ? [...new Set(state.selectedOption.replaceAll(' ', '').split(''))] as Letter[]
        : []
    )
  );

  menuOpen$ = this.state$.pipe(
    map(state => state.menuConfig.menuItems.length > 0)
  );

  gameOutcome$ = combineLatest([
    this.state$.pipe(map(state => state.attemptsLeft)),
    this.toGuessLetters$,
    this.state$.pipe(map(state => state.attemptedLetters)),
  ]).pipe(
    map(([attemptsLeft, toGuessLetters, attemptedLetters]) => {
      if (attemptsLeft === 0) return 'LOSE';
      if (toGuessLetters.every(letter => attemptedLetters.includes(letter))) return 'WIN';
      return null;
    })
  );

  constructor(private http: HttpClient) {
    this.loadCategories();
  }

  private setState(newState: Partial<GlobalState>) {
    this.state$.next({ ...this.state$.getValue(), ...newState });
  }

  loadCategories() {
    this.http.get<{ categories: Categories }>('data/data.json')
      .pipe(
        tap(({ categories }) => this.setState({ categories }))
      )
      .subscribe();
  }

  startGame(category: Category) {
    this.setState({ selectedCategory: category });

    const optionsAvailable = this.state$.getValue().selectedCategory 
        ? this.state$.getValue().categories[this.state$.getValue().selectedCategory].filter(opt => !opt.selected)
        : [];

    const option = optionsAvailable[
      Math.floor(Math.random() * optionsAvailable.length)
    ];

    this.setState(state => ({
      categories: {
        ...state.categories,
        [category]: state.categories[category].map(el =>
          el.name === option.name ? { ...option, selected: true } : el
        ),
      },
      selectedOption: option.name.toUpperCase().replaceAll(`'`, ''),
      attemptsLeft: initialState.attemptsLeft,
      attemptedLetters: [],
      menuConfig: { ...initialState.menuConfig },
    }));
  }

  attemptLetter(letter: Letter) {
    const state = this.state$.getValue();
    if (state.attemptedLetters.includes(letter) || state.menuConfig.menuItems.length > 0) return;

    this.setState({
      attemptedLetters: [...state.attemptedLetters, letter],
      attemptsLeft: state.selectedOption?.includes(letter)
        ? state.attemptsLeft
        : state.attemptsLeft - 1,
    });

    this.gameOutcome$.pipe(
      tap(gameOutcome => {
        if (gameOutcome) {
          this.openMenu();
        }
      })
    ).subscribe();
  }

  quitGame() {
    this.setState(initialState);
    this.loadCategories();
  }

  openMenu() {
    const state = this.state$.getValue();
    this.gameOutcome$.pipe(
      tap(gameOutcome => {
        this.setState({
          menuConfig: {
            header: gameOutcome === 'LOSE'
              ? 'You Lose'
              : gameOutcome === 'WIN'
              ? 'You Win'
              : 'Paused',
            menuItems: [
              !gameOutcome
                ? {
                    label: 'Continue',
                    ariaLabel: 'Resume the game and close menu',
                    onClick: () => this.closeMenu(),
                  }
                : {
                    label: 'Play Again!',
                    ariaLabel: 'Play again with the same category',
                    routerLink: this.state$.getValue().selectedCategory 
                        ? this.state$.getValue().categories[this.state$.getValue().selectedCategory].filter(opt => !opt.selected).length === 0
                            ? '/categories'
                            : undefined
                        : undefined,
                    onClick: () =>
                      this.state$.getValue().selectedCategory 
                        ? this.state$.getValue().categories[this.state$.getValue().selectedCategory].filter(opt => !opt.selected).length === 0
                          ? this.quitGame()
                          : this.startGame(state.selectedCategory!)
                        : undefined,
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
      })
    ).subscribe();
  }

  closeMenu() {
    this.setState({ menuConfig: { ...initialState.menuConfig } });
  }
}

export interface GlobalStoreInterface {
  categoriesNames: () => string[];
  startGame: (category: string) => void;
}

