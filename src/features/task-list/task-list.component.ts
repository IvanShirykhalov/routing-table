import { Component } from '@angular/core';
import { TaskService } from '../../services';
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
import { ITask } from '../../shared';
import { Router, RouterModule } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

/**
 * Компонент для отображения списка задач с возможностью фильтрации, редактирования и удаления
 */
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatColumnDef,
    MatButton,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatCheckbox,
    MatIcon,
    TranslatePipe,
    RouterModule
  ],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  public displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  public dataSource: MatTableDataSource<ITask> = new MatTableDataSource<ITask>([]);
  public filterValue: string = '';

  constructor(
    private readonly taskService: TaskService,
    private readonly router: Router
  ) {
    this.loadTasks();
  }

  /**
   * Загружает задачи из сервиса и обновляет данные таблицы
   */
  public loadTasks(): void {
    this.dataSource.data = this.taskService.getTasks();
  }

  /**
   * Применяет фильтр к списку задач
   */
  public applyFilter(): void {
    this.dataSource.data = this.taskService.getTasks(this.filterValue);
  }

  /**
   * Навигация на страницу создания новой задачи
   */
  public addTask(): Promise<boolean> {
    return this.router.navigate(['/tasks/create'], { state: { mode: 'create' } });
  }

  /**
   * Обработчик клика по строке таблицы
   *
   * @param task - Задача, по которой кликнули
   * @param event - Событие клика
   */
  public openTaskDetails(task: ITask, event: MouseEvent): Promise<boolean> | void {
    const isDeleteButton: Element | null = (event.target as HTMLElement).closest('button[color="warn"]');
    const isCheckbox: Element | null = (event.target as HTMLElement).closest('mat-checkbox');

    if (!isDeleteButton && !isCheckbox) {
      return this.router.navigate(['/tasks', task.id]);
    }
  }

  /**
   * Обработчик изменения статуса задачи
   * @param task Задача, у которой изменился статус
   */
  public onStatusChange(task: ITask): void {
    this.taskService.updateTask(task);
  }

  /**
   * Удаляет задачу с подтверждением
   *
   * @param id - ID задачи для удаления
   */
  public deleteTask(id: number): void {
    if (confirm('Удалить задачу?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }
}
