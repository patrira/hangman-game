import { Component, input } from '@angular/core';
import { StrokifyDirective } from '../../directives/strokify.directive';
import { ButtonComponent } from '../button/button.component';
import { ButtonTemplateDirective } from '../../directives/button-template.directive';

@Component({
  selector: 'app-heading-bar',
  standalone: true,
  imports: [StrokifyDirective, ButtonComponent, ButtonTemplateDirective],
  template: `
    <h1 class="heading-bar">
      <app-button
        styleClass="btn--icon--secondary"
        link="../"
        ariaLabel="Go to previous page"
      >
        <img
          *appButtonTemplate="'icon'"
          class="heading-bar__icon"
          src="images/icon-back.svg"
          alt=""
        />
      </app-button>

      <p class="heading heading--xl" appStrokify>{{ heading() }}</p>
    </h1>
  `,
  styles: `
    @use "../../../../../public/scss/abstracts/_mixins.scss" as mixins;

    .heading-bar {
      display: flex;
      align-items: center;

      @include mixins.respond(phone) {
        justify-content: space-between;
      }

      &__icon {
        @include mixins.respond(tab-land) {
          width: 2.7rem;
          margin-bottom: 1rem;
        }

        @include mixins.respond(phone) {
          width: 1.8rem;
          margin-bottom: 0.5rem;
        }
      }
    }
  `,
})
export class HeadingBarComponent {
  heading = input.required<string>();
}
