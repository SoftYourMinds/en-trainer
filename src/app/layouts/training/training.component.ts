import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { IWord } from 'src/app/shared/models/word.model';

export interface IAnswer {
  id: string,
  result: boolean,
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  collectionId: string;
  words: IWord[];
  answers: IAnswer[] = [];
  currentIndex: number;
  isTrainingInit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private WordService: WordService,
    private ProgresBarService: ProgressBarService,
  ){ 
    this.currentIndex = 0;
  }

  ngOnInit(): void {
    this.ProgresBarService.showProgressBar();
    this.route.params.subscribe((params: Params) => {
      this.collectionId = params['id'];
    });
    
    this.WordService.getTrainingWords(this.collectionId).subscribe((res) => {
      this.words = res;
      this.isTrainingInit = true;
      this.ProgresBarService.hideProgressBar();
      console.log(this.words)
    })

  }

  getAnswer(event: boolean) {
    this.answers.push({
      id: this.words[this.currentIndex]._id,
      result: event
    })
    // 
    this.currentIndex+=1;
    console.log(this.currentIndex);
  }
  
  getCurrentWord() {
    const currentWord = this.words[this.currentIndex];
    return currentWord;
  }

  getCurrentWordStatus() {
    const currentWord = this.words[this.currentIndex];
    return currentWord ? currentWord.status : null;  
  }
}
