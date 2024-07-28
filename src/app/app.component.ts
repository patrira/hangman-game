import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './shared/animations/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main [@routeAnimations]="outlet.activatedRouteData['animation']">
      <router-outlet #outlet="outlet" />
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations],
})
export class AppComponent {}
