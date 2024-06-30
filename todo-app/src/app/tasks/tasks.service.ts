import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task as TaskType } from './task.model';
import { Observable, Subject } from 'rxjs';
import { API_ROUTES } from '../constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskAdded =  new Subject<TaskType | null>();

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<TaskType[]> {
    return this.httpClient.get<TaskType[]>(API_ROUTES.TASKS);
  }

  getTasksByUserId(userId: number): Observable<TaskType[]> {
    return this.httpClient.get<TaskType[]>(`${API_ROUTES.TASKS}/user/${userId}`);
  }

  saveTask(task: TaskType): Observable<TaskType> {
    return this.httpClient.post<TaskType>(API_ROUTES.TASKS, task);
  }

  updateTask(task: TaskType): Observable<TaskType> {
    return this.httpClient.put<TaskType>(`${API_ROUTES.TASKS}/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_ROUTES.TASKS}/${taskId}`);
  }

  notifyTaskAdded(task: TaskType | null): void {
    this.taskAdded.next(task);
  }
}
