import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from '../../language-switcher';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Компонент заголовка приложения
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    LanguageSwitcherComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HeaderComponent {
}
