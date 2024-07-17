import { Component, computed, input } from '@angular/core';
import { Option } from '../../../shared/models/option.model';
import { GameLetterComponent } from '../game-letter/game-letter.component';
import { Letter } from '../../../shared/models/letter.model';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameLetterComponent],
  template: `
    <ul class="board">
      @for(word of optionWords(); track $index;) {
      <li class="board__word">
        @for(letter of word.split(''); track $index) {
        <app-game-letter
          [guessed]="letters().includes(letter)"
          [letter]="letter"
        />
        }
      </li>
      }
    </ul>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    :host { margin-top: auto; }

    .board {
      margin-top: 8.8rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      column-gap: 11.2rem;
      row-gap: 1.6rem;

      @include mixins.respond(tab-land) {
        column-gap: 8.8rem;
        margin-top: 11.1rem;
      }

      @include mixins.respond(phone) {
        column-gap: 4rem;
        margin-top: 7.8rem;
        row-gap: 1.2rem;
      }

      &__word {
        display: flex;
        column-gap: 1.6rem;
        padding-inline: 1.6rem;
        overflow-x: auto;

        @include mixins.respond(tab-land) {
          column-gap: 1.2rem;
          padding-inline: 1.2rem;
        }

        @include mixins.respond(phone) {
          column-gap: 8px;
          padding-inline: 8px;
        }
      }
    }
  `,
})
export class GameBoardComponent {
  selectedOption = input.required<Option['name']>();
  attemptedLetters = input.required<Letter[]>();

  protected optionWords = computed(() => this.selectedOption().split(' '));
  protected letters = computed(() => this.attemptedLetters() as string[]);
}
