import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  onUserFilterChange(event: Event): void {
    const selected = (event.target as HTMLSelectElement).value;
    let userId = selected ? +selected : null;
    this.usersService.setSelectedUserId(userId);
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

}
