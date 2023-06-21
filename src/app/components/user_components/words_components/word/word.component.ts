import { Component, Input } from '@angular/core';
import { IWord } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent {
  @Input() word: IWord;
  isExpansed: boolean =  false;

  constructor(
  ) {

  }

  ngOnInit(): void {
  }
  
  onExpansionPanel(event: Event): void {
    event.stopPropagation();
    this.isExpansed = !this.isExpansed;
  }
}
