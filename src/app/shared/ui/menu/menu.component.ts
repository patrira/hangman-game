import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { NgClass, NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { MenuItem } from '../../models/menu.model';
import { StrokifyDirective } from '../../directives/strokify.directive';
import { MenuTemplateDirective } from '../../directives/menu-template.directive';
import { ButtonComponent } from '../button/button.component';
import { ButtonTemplateDirective } from '../../directives/button-template.directive';
import { bounceAnimation } from '../../animations/bounce-animation';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass,
    UpperCasePipe,
    StrokifyDirective,
    ButtonComponent,
    ButtonTemplateDirective,
  ],
  template: `
    @if (isOpen()) { @if(overlay()) {
    <div class="mask"></div>
    }

    <div
      @bounceAnimation
      [class]="menuClass()"
      [ngClass]="{ 'menu--overlay': this.overlay() }"
    >
      @if(headerTemplate() || header()) {
      <div class="menu__header">
        <ng-container [ngTemplateOutlet]="headerTemplate() || defaultHeader" />

        <ng-template #defaultHeader>
          <span class="heading heading--xl" appStrokify>
            {{ header() }}
          </span>
        </ng-template>
      </div>
      } @if(contentTemplate() || menuItems().length > 0) {
      <div class="menu__items">
        <ng-container
          [ngTemplateOutlet]="contentTemplate() || defaultContent"
        />
        <ng-template #defaultContent>
          @for (menuItem of menuItems(); track $index) {
          <app-button
            [styleClass]="menuItem.buttonStyleClass || 'btn--primary'"
            [link]="menuItem.routerLink || null"
            [ariaLabel]="menuItem.ariaLabel"
            (onClick)="menuItem.onClick?.()"
          >
            <span *appButtonTemplate="'label'" class="heading heading--sm">{{
              menuItem.label | uppercase
            }}</span>
          </app-button>
          }
        </ng-template>
      </div>
      }
    </div>
    }
  `,
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [bounceAnimation],
})
export class MenuComponent {
  header = input<string | null>(null);
  menuItems = input<MenuItem[]>([]);
  menuStyleClass = input<string | null>(null);
  overlay = input(false);
  isOpen = input(false);

  protected menuClass = computed(() => `menu ${this.menuStyleClass() || ''}`);

  protected menuTemplates = contentChildren(MenuTemplateDirective);
  protected headerTemplate = computed(
    () => this.menuTemplates().find((el) => el.type() === 'header')?.tpl
  );
  protected contentTemplate = computed(
    () => this.menuTemplates().find((el) => el.type() === 'content')?.tpl
  );
}
