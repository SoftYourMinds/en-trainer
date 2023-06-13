import { Component } from '@angular/core';
import { SERVER_URL } from 'config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  registerWallper = `${SERVER_URL}/data/images/tample.jpg` 


}
