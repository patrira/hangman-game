import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { MenuComponent } from '../shared/ui/menu/menu.component';
import { GameToolbarComponent } from './ui/game-toolbar/game-toolbar.component';
import { GameKeyboardComponent } from './ui/game-keyboard/game-keyboard.component';
import { GameBoardComponent } from './ui/game-board/game-board.component';
import { GlobalStore } from '../shared/data/global-store';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    ButtonComponent,
    MenuComponent,
    GameToolbarComponent,
    GameBoardComponent,
    GameKeyboardComponent,
  ],
  template: `
    <section class="game section">
      <app-game-toolbar
        [selectedCategory]="store.selectedCategory()!"
        [attemptsLeft]="store.attemptsLeft()"
        (onMenuClick)="store.openMenu()"
      />

      <app-game-board
        [selectedOption]="store.selectedOption()!"
        [attemptedLetters]="store.attemptedLetters()"
      ></app-game-board>

      <app-game-keyboard
        [attemptedLetters]="store.attemptedLetters()"
        (onKeyClick)="store.attemptLetter($event)"
      />

      <app-menu
        menuStyleClass="menu--secondary"
        [overlay]="true"
        [isOpen]="store.menuOpen()"
        [header]="store.menuConfig.header()"
        [menuItems]="store.menuConfig.menuItems()"
      >
      </app-menu>
    </section>
  `,
  styles: `
    @use "../../../public/scss/abstracts/_mixins.scss" as mixins;

    .game {
      padding: 6rem 11.2rem 7.8rem 11.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--bg-gradient);
        opacity: .75;
        z-index: -1;
      }

      @include mixins.respond(desktop) {
        padding: 6rem 3.2rem 7.8rem 3.2rem;
        display: block;
      }

      @include mixins.respond(phone) {
        padding: 4.6rem 2.55rem 3.2rem 2.55rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  readonly store = inject(GlobalStore);
}
