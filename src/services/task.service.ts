import { Injectable } from '@angular/core';
import { ITask } from '../shared';

/**
 * Сервис для работы с задачами
 *
 * Предоставляет методы для CRUD операций с задачами
 * и их хранения в localStorage
 */
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY: 'tasks' = 'tasks';
  private tasks: ITask[] = [];

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Загружает задачи из localStorage
   */
  private loadFromStorage(): void {
    const savedTasks: string | null = localStorage.getItem(this.STORAGE_KEY);
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (this.tasks.length === 0) {
      this.tasks = [
        {
          id: 1,
          title: 'Пример задачи',
          description: 'Это тестовая задача',
          status: false
        }
      ];
      this.saveToStorage();
    }
  }

  /**
   * Возвращает список задач с возможностью фильтрации
   *
   * @param filter - строка для фильтрации задач
   */
  getTasks(filter?: string): ITask[] {
    const tasks = [...this.tasks];

    if (!filter) return tasks;

    return tasks.filter(task =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(filter.toLowerCase()))
    );
  }

  /**
   * Находит задачу по ID
   *
   * @param id - id искомой задачи
   */
  getTask(id: number): ITask | undefined {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * Добавляет новую задачу
   *
   * @param task - объект задачи без id
   */
  addTask(task: Omit<ITask, 'id'>): void {
    const newId = this.generateId();
    this.tasks = [...this.tasks, { ...task, id: newId }];
    this.saveToStorage();
  }

  /**
   * Обновляет существующую задачу
   *
   * @param updatedTask - обновленный объект задачи
   */
  updateTask(updatedTask: ITask): void {
    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveToStorage();
  }

  /**
   * Удаляет задачу по ID
   *
   * @param id - id задачи для удаления
   */
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToStorage();
  }

  /**
   * Генерирует уникальный ID для новой задачи
   */
  private generateId(): number {
    const maxId = Math.max(...this.tasks.map(t => t.id), 0);
    return maxId + 1;
  }

  /**
   * Сохраняет текущие задачи в localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }
}
