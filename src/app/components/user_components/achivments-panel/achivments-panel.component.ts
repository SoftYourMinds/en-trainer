import { Component, OnInit } from '@angular/core';
import { TempService } from 'src/app/services/temp.service';
import { WordService } from 'src/app/services/word.service';

export interface IProgressRateItem {
  filled: boolean;
}

@Component({
  selector: 'app-achivments-panel',
  templateUrl: './achivments-panel.component.html',
  styleUrls: ['./achivments-panel.component.scss']
})
export class AchivmentsPanelComponent implements OnInit {
  dayliLearnedWordsCount: number = 0;
  startdayliLearnedWordsCount: number = 0;
  learnedWordsForAllTime: number = 0;

  progressItems: IProgressRateItem[] = new Array(10); 
  cupFilled: boolean = false;

  constructor(
    private TempService: TempService,
    private WordService: WordService,
  ) { }
    
  ngOnInit(): void {
    this.setProgressRate( this.startdayliLearnedWordsCount);    
    this.TempService.getDailyLearnedWords().subscribe((res) => {
      this.dayliLearnedWordsCount = res;
    })
    this.WordService.getTotalLearnedWordCount().subscribe((result) => {
      this.learnedWordsForAllTime = result;
    })
  }

  ngDoCheck(): void {
    if(this.dayliLearnedWordsCount === this.startdayliLearnedWordsCount) return
    this.setProgressRate(this.dayliLearnedWordsCount)
  }

  setProgressRate(count: number) {
    this.startdayliLearnedWordsCount = this.dayliLearnedWordsCount
    for(let i = 0; i < 10; i++) {
      if(i < count) this.progressItems[i] = {filled: true}
      else this.progressItems[i] = {filled: false}
    }
  
    if(this.dayliLearnedWordsCount >= 10) {
      this.cupFilled = true;
    } 
  } 



}
