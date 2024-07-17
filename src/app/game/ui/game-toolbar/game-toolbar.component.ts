import { Component, input, output } from '@angular/core';
import { Category } from '../../../shared/models/category.model';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ButtonTemplateDirective } from '../../../shared/directives/button-template.directive';

@Component({
  selector: 'app-game-toolbar',
  standalone: true,
  imports: [ButtonComponent, ButtonTemplateDirective],
  template: `
    <aside class="game-toolbar">
      <div class="game-toolbar__start">
        <app-button
          ariaLabel="Pause the game and open menu"
          styleClass="btn--icon--secondary"
          (onClick)="onMenuClick.emit()"
        >
          <img
            *appButtonTemplate="'icon'"
            class="game-toolbar__icon"
            src="images/icon-menu.svg"
            alt=""
          />
        </app-button>

        <h1 class="game-toolbar__category heading heading--lg">
          {{ selectedCategory() }}
        </h1>
      </div>

      <div class="game-toolbar__end">
        <progress
          class="game-toolbar__health-bar"
          [value]="attemptsLeft()"
          min="0"
          max="8"
        ></progress>

        <img
          class="game-toolbar__health-icon"
          src="images/icon-heart.svg"
          alt=""
        />
      </div>
    </aside>
  `,
  styleUrl: './game-toolbar.component.scss',
})
export class GameToolbarComponent {
  attemptsLeft = input.required<number>();
  selectedCategory = input.required<Category>();

  onMenuClick = output();
}
