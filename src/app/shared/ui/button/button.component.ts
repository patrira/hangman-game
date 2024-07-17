import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  model,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonTemplateDirective } from '../../directives/button-template.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass, NgTemplateOutlet],
  template: `
    <ng-template #content>
      @if(labelTemplate() || label()) {
      <ng-container [ngTemplateOutlet]="labelTemplate() || defaultLabel" />
      <ng-template #defaultLabel>
        <span class="heading heading--md">{{ label() }}</span>
      </ng-template>
      } @if(iconTemplate()) {
      <ng-container [ngTemplateOutlet]="iconTemplate()!"></ng-container>
      }
    </ng-template>

    @if(link()) {
    <a
      [routerLink]="link() || null"
      [class]="btnClass()"
      [ngClass]="btnNgClass()"
      [ariaLabel]="ariaLabel()"
      (click)="onClick.emit()"
    >
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </a>
    } @else {
    <button
      [class]="btnClass()"
      [ngClass]="btnNgClass()"
      [ariaLabel]="ariaLabel()"
      [disabled]="disabled()"
      (click)="onClick.emit()"
    >
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </button>
    }
  `,
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  link = input<string | null>(null);
  label = input<string | null>(null);
  ariaLabel = input<string>();
  styleClass = input<string | null>(null);
  disabled = model(false);

  onClick = output();

  protected buttonTemplates = contentChildren(ButtonTemplateDirective);
  protected labelTemplate = computed(
    () => this.buttonTemplates().find((el) => el.type() === 'label')?.tpl
  );
  protected iconTemplate = computed(
    () => this.buttonTemplates().find((el) => el.type() === 'icon')?.tpl
  );

  protected btnClass = computed(() => `btn ${this.styleClass() || ''}`);
  protected btnNgClass = computed(() => ({
    'btn--icon': this.iconTemplate(),
  }));
}
