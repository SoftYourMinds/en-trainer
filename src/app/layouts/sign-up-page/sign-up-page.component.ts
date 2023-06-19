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

  // onMouseMove(event: MouseEvent): void {
  //   const shiftX = -(event.pageX / window.innerWidth) * 20; // Adjust the value to control the shift range
  //   const shiftY = -(event.pageY / window.innerHeight) * 20; // Adjust the value to control the shift range

  //   const footer = event.target as HTMLElement;
  //   footer.style.translate = `${shiftX}px ${shiftY}px`;
  // }
