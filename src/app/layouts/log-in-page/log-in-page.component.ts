import { Component } from '@angular/core';
import { SERVER_URL } from 'config';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
export class LogInPageComponent {
  loginWallper = `${SERVER_URL}/data/images/clouds.jpg`
  // loginWallper = "https://img.freepik.com/free-vector/ocean-big-wave-japanese-style-water-splash-storm-space-weather-nature-hand-drawn-big-wave-vector-illustration_1284-46205.jpg?w=996&t=st=1686725166~exp=1686725766~hmac=87732aed8e1873950be2a8735ac7080c0fc1413443de29410b9aa1a0bbd71851"
  // loginWallper = "https://img.freepik.com/premium-vector/dojo-room-empty-japanese-style-interior-meditation-martial-arts-workout-with-wooden-floor-open-door-with-scenic-peaceful-view-asian-rice-field-cartoon-illustration_107791-5958.jpg?w=996"
  // loginWallper = "https://img.freepik.com/free-vector/gradient-japanese-temple-illustration_52683-46008.jpg?w=740&t=st=1686729130~exp=1686729730~hmac=e9a75349def5c000070270a5058b0dbff92c6df8cbbb77c341ec2c5121bc81c2"
  
}
