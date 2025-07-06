import {Component, output, OutputEmitterRef} from '@angular/core';
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
  public sidenavToggle: OutputEmitterRef<void> = output<void>();

  /**
   * Обработчик клика по иконке меню
   */
  public onMenuClick(): void {
    this.sidenavToggle.emit();
  }
}
