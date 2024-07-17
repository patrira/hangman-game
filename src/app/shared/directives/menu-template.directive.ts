import { Directive, TemplateRef, inject, input } from '@angular/core';
import { MenuTemplateType } from '../models/menu.model';

@Directive({
  selector: '[appMenuTemplate]',
  standalone: true,
})
export class MenuTemplateDirective {
  tpl = inject(TemplateRef);
  type = input.required<MenuTemplateType>({ alias: 'appMenuTemplate' });
}
