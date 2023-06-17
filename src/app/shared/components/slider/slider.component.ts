import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() images: string[];
  @Output() currentSlideChanged = new EventEmitter<string>();
 
  
  currentSlideIndex: number = 0;
  disabled: boolean = false;

  constructor(
    private SliderService: SliderService,
  ) {

  }

  ngOnInit(): void {
    if(!this.images) {
      this.SliderService.setImages([
        "https://nikolab.com.ua/wp-content/themes/nikolab/images/template/backgrounds/placeholder.jpg",
       ])
    }
    this.SliderService.images$.subscribe((data) => {
      if(data.length <= 1) {
        this.disabled = true;
        this.images = data;
        this.currentSlideChanged.emit(this.images[this.currentSlideIndex]);
      } else {
        this.disabled = false;
        this.images = data;
        this.currentSlideChanged.emit(this.images[this.currentSlideIndex]);
      }
    })
  }

  onImageChanged(imageUrl: string) {
    // Handle the changed image URL here
    console.log('Current Image:', imageUrl);
  }

  next() {
    if (this.currentSlideIndex < this.images.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0;
    }
    this.currentSlideChanged.emit(this.images[this.currentSlideIndex]);
  }

  prev() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.images.length - 1;
    }
    this.currentSlideChanged.emit(this.images[this.currentSlideIndex]);
  }

}
