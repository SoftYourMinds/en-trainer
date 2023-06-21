import { Component, Input, OnInit } from '@angular/core';
import { IContextExample } from 'src/app/shared/models/reverso.model';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements OnInit {
  @Input() examples: IContextExample[];
  
  currentIndex: number

  constructor() {
    this.currentIndex = 0;
  }

  ngOnInit(): void {
  }

  next() {
    if (this.currentIndex < this.examples.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
}
