import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const getSlideAnimationStyle = (from: 'left' | 'right') => [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ],
    { optional: true }
  ),
  query(':enter', [style({ left: from === 'left' ? '-100%' : '100%' })], {
    optional: true,
  }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(
      ':leave',
      [
        animate(
          '350ms ease-out',
          style({ left: from === 'left' ? '100%' : '-100%', opacity: 0 })
        ),
      ],
      {
        optional: true,
      }
    ),
    query(':enter', [animate('350ms ease-out', style({ left: '0%' }))], {
      optional: true,
    }),
    query('@*', animateChild(), { optional: true }),
  ]),
];

const slideInRight = getSlideAnimationStyle('right');
const slideInLeft = getSlideAnimationStyle('left');

export const routeAnimations = trigger('routeAnimations', [
  transition('MenuPage => *', slideInRight),
  transition('CategoriesPage => GamePage', slideInRight),
  transition('CategoriesPage => MenuPage', slideInLeft),
  transition('RulesPage => MenuPage', slideInLeft),
  transition('GamePage => *', slideInLeft),
]);
