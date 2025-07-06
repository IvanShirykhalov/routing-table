import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { ROUTE, SortColumn, SortDirection } from './routes-table.constants';
import { IRoute } from '../../shared/models';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss'],
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCellDef,
    TranslatePipe,
  ]
})

/**
 * Таблица маршрутов
 */
export class RoutesTableComponent {
  public displayedColumns: string[] = ['address', 'gateway', 'interface'];
  public dataSource: MatTableDataSource<IRoute>;
  public routes: IRoute[] = ROUTE;

  private sortColumn: SortColumn | null = null;
  private sortDirection: SortDirection = 'asc';

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<IRoute>(this.routes);
  }


  /**
   * Сортирует таблицу по указанному столбцу.
   * Поддерживает 3 состояния: asc → desc → default (возврат к оригинальному порядку)
   *
   * @param column - Название столбца для сортировки ('address', 'gateway', 'interface')
   */
  public sortRoutes(column: SortColumn): void {
    if (this.sortColumn === column) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.dataSource.data = [...ROUTE];
        this.changeDetector.markForCheck();
        return;
      }
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const isAsc: boolean = this.sortDirection === 'asc';

    this.dataSource.data = [...this.dataSource.data].sort((a, b): number => {
      switch (column) {
        case 'address':
          return this.compareIP(a.address, b.address, isAsc);
        case 'gateway':
          return this.compareIP(a.gateway, b.gateway, isAsc);
        case 'interface':
          return this.compareStrings(a.interface, b.interface, isAsc);
        default:
          return 0;
      }
    });

    this.changeDetector.markForCheck();
  }

  /**
   * Возвращает символ стрелки для отображения в заголовке столбца.
   *
   * @param column - Название столбца ('address', 'gateway', 'interface')
   *
   * @returns Символ стрелки ('↑', '↓', '⇅')
   */
  public getArrow(column: SortColumn): string {
    if (this.sortColumn !== column) {
      return '⇅'
    }

    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  /**
   * Сравнивает два IP-адреса для сортировки.
   *
   * @param ip1 - Первый IP-адрес
   * @param ip2 - Второй IP-адрес
   * @param isAsc - Направление сортировки (true — по возрастанию)
   *
   * @returns Результат сравнения (-1, 0, 1)
   */
  private compareIP(ip1: string, ip2: string, isAsc: boolean): number {
    const parts1: number[] = ip1.split('.').map(Number);
    const parts2: number[] = ip2.split('.').map(Number);

    for (let i: number = 0; i < 4; i++) {
      if (parts1[i] !== parts2[i]) {
        return isAsc ? parts1[i] - parts2[i] : parts2[i] - parts1[i];
      }
    }

    return 0;
  }

  /**
   * Сравнивает две строки для сортировки.
   *
   * @param str1 - Первая строка
   * @param str2 - Вторая строка
   * @param isAsc - Направление сортировки (true — по возрастанию)
   *
   * @returns Результат сравнения (-1, 0, 1)
   */
  private compareStrings(str1: string, str2: string, isAsc: boolean): number {
    const comparison = str1.localeCompare(str2);

    return isAsc ? comparison : -comparison;
  }
}
