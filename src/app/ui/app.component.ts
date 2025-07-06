import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header';

/**
 * Главный компонент приложения
 */
@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content {
      padding: 20px;
    }
  `],
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {}
