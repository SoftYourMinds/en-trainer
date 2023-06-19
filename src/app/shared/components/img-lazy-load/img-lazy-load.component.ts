import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img-lazy-load',
  templateUrl: './img-lazy-load.component.html',
  styleUrls: ['./img-lazy-load.component.scss']
})
export class ImgLazyLoadComponent implements OnChanges {
  @Input() img: string;
  @Output() imageChanged = new EventEmitter<string>();
  empty: string;
 

  
  constructor(){
    this.empty = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes[this.img] && !changes[this.img].firstChange) {
      this.imageChanged.emit(this.img);
    }
  }
    
  lazyLoad() {
    setTimeout(()=>{
      this.empty = this.img;
    }, 500);
  }

  getBackgroundStyle(): any {
    return {
      'background': this.empty ? `url(${this.empty}) center/cover no-repeat` : ''
    };
  }
}
