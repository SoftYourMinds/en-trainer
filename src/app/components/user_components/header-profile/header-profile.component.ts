import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent {
   @Input() email: string;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService) {

  }

  onLogout() {
    this.authorizationService.logout()
    this.router.navigate(['/start'])
  }
}
