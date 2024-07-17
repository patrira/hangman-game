import { Component, input } from '@angular/core';
import { flipAnimation } from '../../../shared/animations/flip-animation';

@Component({
  selector: 'app-game-letter',
  standalone: true,
  template: `
    <div class="letter" [@flipAnimation]="guessed()">
      <div class="letter__side letter__side--visible">
        @if (guessed()) {
        <span class="letter__label heading heading--lg">
          {{ letter() }}
        </span>
        }
      </div>
      <div class="letter__side letter__side--hidden"></div>
    </div>
  `,
  styleUrl: './game-letter.component.scss',
  animations: [flipAnimation],
})
export class GameLetterComponent {
  guessed = input.required<boolean>();
  letter = input.required<string>();
}
