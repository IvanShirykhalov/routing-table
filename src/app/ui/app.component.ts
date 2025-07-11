import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Компонент для инициализации приложения
 */
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
  standalone: true
})
export class AppComponent {}
