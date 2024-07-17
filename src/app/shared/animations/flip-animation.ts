import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const flipAnimation = trigger('flipAnimation', [
  state(
    'true',
    style({
      transform: 'rotateY(180deg)',
    })
  ),
  state(
    'false',
    style({
      transform: 'rotateY(0)',
    })
  ),
  transition('false => true', animate('450ms')),
]);
