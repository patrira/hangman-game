import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeadingBarComponent } from '../shared/ui/heading-bar/heading-bar.component';
import { ButtonComponent } from '../shared/ui/button/button.component';
import { GlobalStore } from '../shared/data/global-store';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HeadingBarComponent, ButtonComponent],
  template: `
    <section class="categories section">
      <app-heading-bar heading="Pick a Category" />

      <ul class="categories__list">
        @for (category of store.categoriesNames(); track $index) {
        <li>
          <app-button
            link="/game"
            styleClass="btn--full btn--primary"
            [label]="category.toUpperCase()"
            [ariaLabel]="'Select the ' + category + ' and start a game'"
            (onClick)="store.startGame(category)"
          />
        </li>
        }
      </ul>
    </section>
  `,
  styles: `
    @use "../../../public/scss/abstracts/_mixins.scss" as mixins;

    .categories {
      &__list {
        list-style-type: none;
        margin-top: 15.5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 19rem;
        row-gap: 5rem;
        column-gap: 3.2rem;

        @include mixins.respond(desktop) {
          margin-top: 11.4rem;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 18rem;
          gap: 3.2rem;
        }

        @include mixins.respond(phone) {
          margin-top: 10rem;
          grid-template-columns: 1fr;
          grid-auto-rows: 7.7rem;
          gap: 1.6rem;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  readonly store = inject(GlobalStore);
}
