import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-learn-panel',
  templateUrl: './learn-panel.component.html',
  styleUrls: ['./learn-panel.component.scss']
})
export class LearnPanelComponent implements OnInit {
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
