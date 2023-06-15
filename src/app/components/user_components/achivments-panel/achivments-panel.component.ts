import { Component, OnInit } from '@angular/core';

export interface IProgressRateItem {
  filled: boolean;
}

@Component({
  selector: 'app-achivments-panel',
  templateUrl: './achivments-panel.component.html',
  styleUrls: ['./achivments-panel.component.scss']
})
export class AchivmentsPanelComponent implements OnInit {
  lernedWordsForDayCount: number = 10;
  learnedWordsForAllTime: number = 100;

  progressItems: IProgressRateItem[] = new Array(10); 
  cupFilled: boolean = false;

  constructor() {
  }
  
  ngOnInit(): void {
    this.setProgressRate();
    
  }

  setProgressRate() {
    for(let i = 0; i < 10; i++) {
      if(i < this.lernedWordsForDayCount) this.progressItems[i] = {filled: true}
      else this.progressItems[i] = {filled: false}
    }
    // this.progressItems.map((el, i) => {
    //   if(i < this.lernedWordsForDayCount) el = {filled: true}
    //   else el = {filled: false}
    // })
    if(this.lernedWordsForDayCount >= 10) {
      this.cupFilled = true;
    } 
    console.log(this.progressItems)
  } 



}
