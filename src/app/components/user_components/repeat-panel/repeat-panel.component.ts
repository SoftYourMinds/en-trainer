import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-repeat-panel',
  templateUrl: './repeat-panel.component.html',
  styleUrls: ['./repeat-panel.component.scss']
})
export class RepeatPanelComponent implements OnInit {
  wordsForTraining: number = 0

  constructor(
    private WordService: WordService,
  ) {}

  ngOnInit(): void {
    this.WordService.getGlobalTrainingCount().subscribe((res) =>{
      this.wordsForTraining = res;
    })   
  }


}

