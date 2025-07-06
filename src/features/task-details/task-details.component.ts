import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services';
import { ITask } from '../../shared';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatHint } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

/**
 * Компонент для создания/редактирования задачи
 */
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatCardHeader,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    MatLabel,
    MatError,
    MatHint
  ],
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public taskForm: FormGroup;
  public isNew: boolean = true;
  public initialTitle: string = '';

  constructor(
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(50)]],
      status: [false]
    });
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    const state: any = window.history.state;

    this.isNew = state?.mode === 'create' || id === 'create';

    if (!this.isNew && id) {
      const existingTask: ITask | undefined = this.taskService.getTask(+id);
      if (existingTask) {
        this.initialTitle = existingTask.title;
        this.taskForm.patchValue(existingTask);
      }
    }
  }

  /**
   * Сохраняет задачу (создает новую или обновляет существующую)
   */
  public save(): Promise<boolean> | void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.isNew) {
      this.taskService.addTask(this.taskForm.value);
    } else {
      this.taskService.updateTask(this.taskForm.value as ITask);
    }

    return this.navigateToTaskList();
  }

  /**
   * Отмена редактирования и возврат к списку задач
   */
  public cancel(): Promise<boolean> {
    return this.navigateToTaskList();
  }

  /**
   * Навигация к списку задач
   */
  private navigateToTaskList(): Promise<boolean> {
    return this.router.navigate(['/tasks']);
  }

  // Геттеры для удобного доступа к полям формы
  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }
}
