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
