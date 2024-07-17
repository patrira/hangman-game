import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Categories, Category } from '../models/category.model';
import { Letter } from '../models/letter.model';
import { Option } from '../models/option.model';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(
    ({ categories, selectedCategory, selectedOption, menuConfig }) => ({
      categoriesNames: computed(() => Object.keys(categories())),
      optionsAvailable: computed(() =>
        selectedCategory()
          ? categories()[selectedCategory()!].filter((opt) => !opt.selected)
          : []
      ),
      toGuessLetters: computed<Letter[]>(
        () =>
          [
            ...new Set(selectedOption()?.replaceAll(' ', '').split('')),
          ] as Letter[]
      ),
      menuOpen: computed(() => menuConfig().menuItems.length > 0),
    })
  ),
  withComputed(({ attemptsLeft, toGuessLetters, attemptedLetters }) => ({
    gameOutcome: computed<'WIN' | 'LOSE' | null>(() => {
      if (attemptsLeft() === 0) return 'LOSE';
      if (toGuessLetters().every((el) => attemptedLetters().includes(el)))
        return 'WIN';

      return null;
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCategories: rxMethod<void>(
      pipe(
        switchMap(() => http.get<{ categories: Categories }>('data/data.json')),
        tap(({ categories }) => patchState(store, { categories }))
      )
    ),
    startGame(category: Category) {
      patchState(store, { selectedCategory: category });

      const option =
        store.optionsAvailable()[
          Math.floor(Math.random() * store.optionsAvailable().length)
        ];

      patchState(store, ({ categories }) => ({
        categories: {
          ...categories,
          [category]: categories[category].map((el) =>
            el.name === option.name ? { ...option, selected: true } : el
          ),
        },
        selectedOption: option.name.toUpperCase().replaceAll(`'`, ''),
        attemptsLeft: initialState.attemptsLeft,
        attemptedLetters: [],
        menuConfig: { ...initialState.menuConfig },
      }));
    },
    attemptLetter(letter: Letter) {
      if (store.attemptedLetters().includes(letter) || store.menuOpen()) return;

      patchState(
        store,
        ({ attemptedLetters, attemptsLeft, selectedOption }) => ({
          attemptedLetters: [...attemptedLetters, letter],
          attemptsLeft: selectedOption?.includes(letter)
            ? attemptsLeft
            : attemptsLeft - 1,
        })
      );

      if (store.gameOutcome()) {
        this.openMenu();
      }
    },
    quitGame() {
      patchState(store, ({ categories }) => ({ ...initialState, categories }));
      this.loadCategories();
    },
    openMenu() {
      patchState(store, () => ({
        menuConfig: {
          header:
            store.gameOutcome() === 'LOSE'
              ? 'You Lose'
              : store.gameOutcome() === 'WIN'
              ? 'You Win'
              : 'Paused',
          menuItems: [
            !store.gameOutcome()
              ? {
                  label: 'Continue',
                  ariaLabel: 'Resume the game and close menu',
                  onClick: () => this.closeMenu(),
                }
              : {
                  label: 'Play Again!',
                  ariaLabel: 'Play again with the same category',
                  routerLink:
                    store.optionsAvailable().length === 0
                      ? '/categories'
                      : undefined,
                  onClick: () =>
                    store.optionsAvailable().length === 0
                      ? this.quitGame()
                      : this.startGame(store.selectedCategory()!),
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
      }));
    },
    closeMenu() {
      patchState(store, { menuConfig: { ...initialState.menuConfig } });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadCategories();
    },
  })
);
