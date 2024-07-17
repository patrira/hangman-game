import { animate, style, transition, trigger } from '@angular/animations';

export const bounceAnimation = trigger('bounceAnimation', [
  transition(':enter', [
    style({ opacity: 0, scale: '0.8' }),
    animate(
      '300ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
      style({ opacity: 1, scale: '1' })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms cubic-bezier(0.68, -0.55, 0.27, 1.75)',
      style({ opacity: 0, scale: '0.8' })
    ),
  ]),
]);
