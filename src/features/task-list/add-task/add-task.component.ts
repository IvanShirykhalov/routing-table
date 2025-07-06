import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-add',
  templateUrl: './add-task.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    NgIf
  ]
})
export class TaskAddComponent {
  titleControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20)
  ]);

  descriptionControl = new FormControl('', [
    Validators.maxLength(50)
  ]);

  constructor(
    private dialogRef: MatDialogRef<TaskAddComponent>,
    private taskService: TaskService
  ) {
  }

  save(): void {
    if (this.titleControl.valid) {
      this.taskService.addTask({
        title: this.titleControl.value!,
        description: this.descriptionControl.value ?? undefined,
        status: false
      });
      this.dialogRef.close(true);
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
