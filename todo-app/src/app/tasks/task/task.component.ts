import { Component, OnInit, Input  } from '@angular/core';
import { State, Task as TaskType } from '../task.model';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TasksOperationService } from '../tasks-operation.service';

@Component({
  selector: '[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: TaskType;
  @Input() index!: number;
  faPen = faPen;
  faTrash = faTrash;

  constructor(private tasksOperationService: TasksOperationService) { }

  getBadgeColor(state: State): string {
    switch (state.toString()) {
      case 'PENDING':
        return 'secondary';
      case 'IN_PROGRESS':
        return 'primary';
      case 'COMPLETED':
        return 'success';
      default:
        return 'secondary';
    }
  }

  operationTask(operation: 'create' | 'update' | 'delete', task: TaskType) {
    this.tasksOperationService.setOperation(operation, task);
  }

  ngOnInit(): void {
  }
}
