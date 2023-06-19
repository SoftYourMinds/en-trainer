import { Component, ElementRef, AfterViewInit, ViewChild, Output, Input,
  EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements AfterViewInit   {
  @ViewChild('endOfPage') endOfPage!: ElementRef;
  @Input() loading: boolean;
  @Output() onPageEnd = new EventEmitter<boolean>();
  @Input() isFullLoaded: boolean;

  constructor() {
    
  }
  
  ngAfterViewInit() {
    this.observeEndOfPage();
  }

  observeEndOfPage() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if(!this.loading) this.onPageEnd.emit(true);
        }
      });
    }, options);

    observer.observe(this.endOfPage.nativeElement);
  }
}


 // if(!this.pageEnd) {
          //   this.loadMoreItems().subscribe((result) => {
          //     this.pageEnd = result; 
          //   });
          // }