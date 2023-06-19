import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  user: IUser;

  constructor(
    private AuthorizationService: AuthorizationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.AuthorizationService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
    })
    this.user = this.AuthorizationService.getUser()
  }

  onLogout() {
    this.AuthorizationService.logout()
    this.router.navigate(['/start'])
  }
}

