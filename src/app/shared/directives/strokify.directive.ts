import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appStrokify]',
  standalone: true,
  host: {
    class: 'heading--strokify',
    '[attr.stroke-text]': 'el.nativeElement.textContent',
  },
})
export class StrokifyDirective {
  protected el: ElementRef<HTMLParagraphElement | HTMLHeadingElement> =
    inject(ElementRef);
}
