import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appButtonTemplate]',
  standalone: true,
})
export class ButtonTemplateDirective {
  tpl = inject(TemplateRef);
  type = input.required<ButtonTemplateType>({ alias: 'appButtonTemplate' });
}

type ButtonTemplateType = 'label' | 'icon';
