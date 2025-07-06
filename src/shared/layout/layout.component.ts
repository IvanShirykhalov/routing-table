import { Component, signal, WritableSignal } from '@angular/core';
import { SidebarComponent } from '../../app/ui/sidebar';
import { HeaderComponent } from '../../app/ui/header';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet,
    MatSidenavModule
  ]
})
export class LayoutComponent {
  public isSidenavOpen: WritableSignal<boolean> = signal(true);

  /**
   * Переключает состояние бокового меню
   */
  public toggleSidenav(): void {
    this.isSidenavOpen.update((open: boolean): boolean => !open);
  }
}
