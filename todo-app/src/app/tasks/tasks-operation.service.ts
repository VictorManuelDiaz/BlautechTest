import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task as TaskType } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksOperationService {

  private operationSubject = new Subject<{ operationFlag: 'create' | 'update' | 'delete', selectedTask: TaskType | null }>();
  operation$ = this.operationSubject.asObservable();

  setOperation(operationFlag: 'create' | 'update' | 'delete', selectedTask: TaskType | null): void {
    this.operationSubject.next({ operationFlag, selectedTask });
  }
}
