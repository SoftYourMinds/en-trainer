import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ITempWords, TempService } from 'src/app/services/temp.service';
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

  collection_id: string;
  words: IWord[];
  answers: IAnswer[] = [];
  currentIndex: number;
  isTrainingInit: boolean = false;
  
  status: number = -1; // before sending result
  wordIds: ITempWords = {wordIds: []};
  
  trueAnswers: number = 0;
  allAnswersCount: number = 0;
  progressValue: number = 0;
  countLastWords: number = 0;

  constructor(
    private route: ActivatedRoute,
    private WordService: WordService,
    private ProgresBarService: ProgressBarService,
    private TempService: TempService,
  ){ 
    this.currentIndex = 0;
  }

  ngOnInit(): void {
    this.initTraining();
  }

  initTraining() {
    this.isTrainingInit = false;
    this.ProgresBarService.showProgressBar();
    
    this.words = [];
    this.answers = [];
    this.currentIndex = 0;
    this.status = -1;
    this.wordIds = {wordIds: []};
    
    this.trueAnswers = 0;
    this.allAnswersCount = 0;
    this.progressValue = 0;
    this.countLastWords = 0;
    
    this.route.params.subscribe((params: Params) => {
      this.collection_id = params['id'];
    });
    
    this.WordService.getTrainingWords(this.collection_id).subscribe((res) => {
      this.words = res;
      this.words.sort(this.getRandomNumber);
      this.isTrainingInit = true;
      this.ProgresBarService.hideProgressBar();
      console.log(this.words)
    })

  }

  getRandomNumber(): number {
    return Math.random() - 0.5;
  }

  getAnswer(event: boolean) {
    this.answers.push({
      id: this.words[this.currentIndex]._id,
      result: event
    })
    this.currentIndex+=1;
    console.log(this.currentIndex);
    this.processResultTraining();
  }

  continueTrainingSession(event: boolean) {
    if(event === true) this.initTraining(); 
  }
  
  getCurrentWord() {
    const currentWord = this.words[this.currentIndex];
    return currentWord;
  }

  getCurrentWordStatus() {
    if(this.status === 505) return 505; 
    const currentWord = this.words[this.currentIndex];
    return currentWord ? currentWord.status : null;  
  }

  processResultTraining() {
    if(this.currentIndex !== this.words.length) return
      this.ProgresBarService.showProgressBar();
      
      this.answers.forEach(el => {
        if(el.result === true) this.wordIds.wordIds.push(el.id);
      })
      console.log(this.wordIds)

      this.trueAnswers = this.wordIds.wordIds.length;
      this.allAnswersCount = this.words.length;
      console.log("allAnswersCount", this.allAnswersCount);

      this.progressValue = this.trueAnswers / this.allAnswersCount  * 100;
      
      this.WordService.updateWordsStatus(this.wordIds).subscribe((res) => {
        this.WordService.getCollectionWordsForTrainingCount(this.collection_id).subscribe((count)=>{
          this.countLastWords = count;
          this.ProgresBarService.hideProgressBar();
          this.status = 505;
        })

        this.TempService.addWordsToTemp(this.wordIds).subscribe((temp)=>{
         
        })
      })
  }
}
