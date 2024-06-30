import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { Task as TaskType, State } from '../task.model';
import { TasksService } from '../tasks.service';
import { Subscription } from 'rxjs';
import { TasksOperationService } from '../tasks-operation.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit, OnDestroy {

  users: User[] = [];
  newTask: TaskType = {
    id: 0,
    title: '',
    description: '',
    state: State.PENDING,
    created_at: '',
    user: {
      id: 0,
      username: '',
      fullName: ''
    }
  };

  public State = State;

  private operationSubscription: Subscription | undefined;
  operationFlag: 'create' | 'update' | 'delete' = 'create';
  selectedTask: TaskType | null = null;

  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    private tasksOperationService: TasksOperationService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.subscribeToOperation();
  }

  ngOnDestroy(): void {
    if (this.operationSubscription) {
      this.operationSubscription.unsubscribe();
    }
  }

  loadUsers(): void {
    this.usersService.getUsers()
      .subscribe(
        (users: User[]) => {
          this.users = users;
        },
        (error) => {
          console.error('Error fetching users', error);
        }
      );
  }

  subscribeToOperation(): void {
    this.operationSubscription = this.tasksOperationService.operation$
      .subscribe(({ operationFlag, selectedTask }) => {
        this.operationFlag = operationFlag;
        this.selectedTask = selectedTask;
        this.newTask = {
          id: selectedTask?.id || 0,
          title: selectedTask?.title || '',
          description: selectedTask?.description || '',
          state: selectedTask ? this.getStateNumberValue(selectedTask.state.toString()) : State.PENDING,
          created_at: selectedTask?.created_at || '',
          user: selectedTask?.user || { id: 0, username: '', fullName: '' }
        };
      });
  }

  getStateNumberValue(state: string): number {
    switch (state) {
      case 'PENDING':
        return 0;
      case 'IN_PROGRESS':
        return 1;
      case 'COMPLETED':
        return 2;
      default:
        return 0;
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.newTask);
    if (this.newTask.title && this.newTask.state !== null && this.newTask.user.id !== null) {
      if (this.operationFlag === 'create') {
        this.tasksService.saveTask(this.newTask)
          .subscribe(
            (savedTask: TaskType) => {
              console.log('Task saved successfully:', savedTask);
              this.tasksService.notifyTaskAdded(savedTask);
              this.resetForm();
            },
            (error) => {
              console.error('Error saving task:', error);
            }
          );
      } else if (this.operationFlag === 'update' && this.selectedTask) {
        this.tasksService.updateTask(this.newTask)
          .subscribe(
            (updatedTask: TaskType) => {
              console.log('Task updated successfully:', updatedTask);
              this.tasksService.notifyTaskAdded(updatedTask);
              this.resetForm();
            },
            (error) => {
              console.error('Error updating task:', error);
            }
          );
      } else if (this.operationFlag === 'delete' && this.selectedTask && this.selectedTask.id !== undefined) {
        this.tasksService.deleteTask(this.selectedTask.id)
          .subscribe(
            () => {
              console.log('Task deleted successfully');
              this.tasksService.notifyTaskAdded(null);
              this.resetForm();
            },
            (error) => {
              console.error('Error deleting task:', error);
            }
          );
      }
    } else {
      console.error('Form data is incomplete');
    }
  }

  resetForm(): void {
    this.operationFlag = 'create';
    this.selectedTask = null;
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      state: State.PENDING,
      created_at: '',
      user: {
        id: 0,
        username: '',
        fullName: ''
      }
    };
  }
}
