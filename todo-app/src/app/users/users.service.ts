import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { API_ROUTES } from '../constants/api-routes';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private selectedUserIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public selectedUserId$: Observable<number | null> = this.selectedUserIdSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  setSelectedUserId(userId: number | null): void {
    this.selectedUserIdSubject.next(userId);
  }

  getSelectedUserId(): Observable<number | null> {
    return this.selectedUserId$;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(API_ROUTES.USERS);
  }
}
