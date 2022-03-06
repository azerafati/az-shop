import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../core/model/user';
import { Observable, ReplaySubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new ReplaySubject<User>(1);

  baseApiUrl = environment.baseApiUrl + '/users';

  constructor(
    private httpClient: HttpClient
  ) {

  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  getCurrentUserId(): number | undefined {
    let userId;
    this.user$.pipe(take(1)).subscribe(
      user => userId = user.id
    )
    return userId;
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseApiUrl);
  }

  setUser(user: User): void {
    this.user$.next(user);
  }
}
