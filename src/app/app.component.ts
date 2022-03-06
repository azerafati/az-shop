import { Component } from '@angular/core';
import { UserService } from './shared/service/user.service';
import { User } from './core/model/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  users$ = this.userService.getUsers();
  isMobile$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(map(result => result.matches));


  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  setUser(user: User) {
    this.userService.setUser(user);
  }
}
