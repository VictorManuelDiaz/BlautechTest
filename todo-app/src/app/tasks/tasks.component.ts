import { Component, OnDestroy, OnInit } from '@angular/core';

import { TasksService } from './tasks.service';
import { UsersService } from '../users/users.service';
import { Task as TaskType } from './task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: TaskType[] = [];
  selectedUserId: number | null = null;
  private userFilterSubscription: Subscription;
  private taskAddedSubscription: Subscription;

  constructor(private tasksService: TasksService, private usersService: UsersService) {
    this.userFilterSubscription = new Subscription();
    this.taskAddedSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscribeToUserFilter();
    this.subscribeToTaskAdded();
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.userFilterSubscription.unsubscribe();
    this.taskAddedSubscription.unsubscribe();
  }

  subscribeToUserFilter(): void {
    this.userFilterSubscription = this.usersService.getSelectedUserId()
      .subscribe(userId => {
        this.selectedUserId = userId;
        this.loadTasks();
      });
  }


  subscribeToTaskAdded(): void {
    this.taskAddedSubscription = this.tasksService.taskAdded
      .subscribe((newTask: TaskType | null) => {
        this.loadTasks();
      });
  }

  loadTasks(): void {
    if (this.selectedUserId !== null) {
      this.tasksService.getTasksByUserId(this.selectedUserId)
        .subscribe(
          (tasks: TaskType[]) => {
            this.tasks = tasks;
          },
          (error) => {
            console.error('Error fetching tasks', error);
          }
        );
    } else {
      this.tasksService.getTasks()
        .subscribe(
          (tasks: TaskType[]) => {
            this.tasks = tasks;
          },
          (error) => {
            console.error('Error fetching tasks', error);
          }
        );
    }
  }
}
