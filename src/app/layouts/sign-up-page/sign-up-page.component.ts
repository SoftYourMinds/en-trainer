import { Component } from '@angular/core';
import { SERVER_URL } from 'config';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
  registerWallper = `${SERVER_URL}/data/images/tample.jpg`
}

