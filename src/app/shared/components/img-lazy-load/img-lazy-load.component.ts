import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-lazy-load',
  templateUrl: './img-lazy-load.component.html',
  styleUrls: ['./img-lazy-load.component.scss']
})
export class ImgLazyLoadComponent {
  @Input() img: string;
  empty: string;
  
  constructor(){
    this.empty = "";
  }

  onMouseMove(event: MouseEvent): void {
    const shiftX = -(event.pageX / window.innerWidth) * 20; // Adjust the value to control the shift range
    const shiftY = -(event.pageY / window.innerHeight) * 20; // Adjust the value to control the shift range

    const footer = event.target as HTMLElement;
    footer.style.backgroundPosition = `${shiftX}px ${shiftY}px`;
  }
    
  lazyLoad() {
    setTimeout(()=>{
      this.empty = this.img;
    }, 2000);
  }

  getBackgroundStyle(): any {
    return {
      'background': this.empty ? `url(${this.empty}) center center / cover no-repeat` : ''
    };
  }
}
