import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

/**
 * Компонент переключателя языка приложения
 */
@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatIconButton, MatTooltip, CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent implements OnInit {
  public currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || 'ru';
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.translate.use(this.currentLang);
  }

  /**
   * Возвращает путь к флагу текущего языка
   */
  protected getFlagPath(): string {
    return this.currentLang === 'ru'
      ? 'assets/flags/ru.svg'
      : 'assets/flags/us.svg';
  }

  /**
   * Переключает язык приложения
   */
  protected toggleLanguage(): void {
    this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
    this.translate.use(this.currentLang);
    localStorage.setItem('userLang', this.currentLang);
  }
}
