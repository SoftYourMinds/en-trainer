import { Component } from '@angular/core';
import { SERVER_URL } from 'config';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent {
  loginWallper = `${SERVER_URL}/data/images/tample.jpg`
}
