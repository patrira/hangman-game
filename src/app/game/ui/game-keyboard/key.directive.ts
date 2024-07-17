import { Directive, inject, input } from '@angular/core';
import { Letter } from '../../../shared/models/letter.model';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { debounceTime, filter, fromEvent, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'app-button[appKey]',
  standalone: true,
})
export class KeyDirective {
  #host = inject(ButtonComponent);
  key = input.required<Letter>({ alias: 'appKey' });

  constructor() {
    fromEvent(document, 'keydown')
      .pipe(
        takeUntilDestroyed(),
        debounceTime(350),
        map((e) => (e as KeyboardEvent).key.toUpperCase() as Letter),
        filter((letter) => letter === this.key() && !this.#host.disabled()),
        tap(() => this.#host.onClick.emit())
      )
      .subscribe();
  }
}
