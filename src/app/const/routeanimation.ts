import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const RouteAnimation = trigger('routeAnimation', [
  state('*', style({ 
    opacity: 1,
    display: 'block',
    position: 'absolute',
    transform: 'translateX(0px)'
  })),
  transition(':enter', [
    style({ 
      opacity: 0,
      transform: 'translateX(-100px)'
    }),
    animate('300ms ease-out')
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ 
      opacity: 0,
      transform: 'translateX(100px)'
    }))
  ])
]);
