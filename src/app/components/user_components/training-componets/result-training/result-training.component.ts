import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-result-training',
  templateUrl: './result-training.component.html',
  styleUrls: ['./result-training.component.scss']
})
export class ResultTrainingComponent {
  @Input() trueAnswers: number;
  @Input() allAnswersCount: number;
  @Input() progressValue: number;
  @Input() collection_id: string;
  @Input() countLastWords: number;
  @Output() isContinue = new EventEmitter<boolean>();
  
  constructor(
    private WordService: WordService
  ) {}

  onContinue() {
    this.isContinue.emit(true)
  }

  @HostListener('document:keydown.enter')
  onEnterKey() {
     this.onContinue();
  }

  


}
