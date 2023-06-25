import { Component,AfterViewInit, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { SliderService } from 'src/app/shared/components/slider/slider.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { IWord } from 'src/app/shared/models/word.model';
import { shuffleArray } from 'src/app/shared/fitches/shuffleArray';
import { SpeachSyntesistService } from 'src/app/shared/fitches/speach-syntesist.service';

@Component({
  selector: 'app-task-choise',
  templateUrl: './task-choise.component.html',
  styleUrls: ['./task-choise.component.scss'],
})
export class TaskChoiseComponent implements OnInit {
  @Input() word: IWord;
  @Output() answer = new EventEmitter<boolean>()

  taskWords: string[]; // слова для тренування
  afterCorrectAnswer: boolean; // доступ до функціонала після правильно відповіді користувача
  correctAnswer:string; // правильна відповідь
  firstAnswer: any; // перша обрана відповідь йде у відгук
  isChoiceTaskInit: boolean; // чи ініціалюзувався компонента 
  selectedValue: number;  // який із mat-radio-button треба щоб обрався 

  constructor(
    private WordService: WordService,
    private SpeachSyntesists: SpeachSyntesistService
  ) {}

  ngOnInit(): void {
    this.initChoiceTask()    
  }

  ngDoCheck(): void {
    if(this.correctAnswer === this.word.word) return;
    else this.initChoiceTask();
  }

  initChoiceTask() {
  
    this.firstAnswer = null;
    this.isChoiceTaskInit = false;
    this.afterCorrectAnswer = false;
    this.selectedValue = -1;
    this.taskWords = [];

    this.correctAnswer = this.word.word; 
    this.taskWords = [this.correctAnswer];

    this.WordService.getTaskChoice(this.word.collection_id, this.word._id).subscribe((res)=>{
      this.taskWords.push(...res);
      this.taskWords = shuffleArray(this.taskWords);
      this.isChoiceTaskInit = true;
      console.log(res);
    })
  }
// Перша первірка служить для того щоб визначати який варіант відповіді користувач обрав першим
// друга первірка служить перевіркой на правильне питання що тягне за собою подальший розвиток подій
  check(event: any){ 
    if(this.firstAnswer === null) {
      if(this.taskWords[event.value] === this.correctAnswer) this.firstAnswer = true;
      else this.firstAnswer = false;  
    }
    console.log(event.value)
    if(this.taskWords[event.value] === this.word.word) {
      this.afterCorrectAnswer = true;
      this.SpeachSyntesists.speakText(this.correctAnswer);
    } 
  }

  getBackgroundStyle(): any {
    return {
      'background': this.word.currentImage ? `url(${this.word.currentImage}) center/cover no-repeat` : '',
      'filter': !this.afterCorrectAnswer ? `blur(40px)` : 'none'
    };
  }

  // відправляю відповідь за завдання, якщо з першого разу вгадав то тру якщо ні то фолс
  emitRespond() { 
    if(!this.afterCorrectAnswer) return
    this.answer.emit(this.firstAnswer);
  }

  @HostListener('document:keydown.enter')
  onEnterKey() {
     this.emitRespond();
  }

  @HostListener('document:keydown.1')
  onEnterKeyOne() {
    this.selectedValue = 0;
    this.check({ value: 0 });
  } 

  @HostListener('document:keydown.2')
  onEnterKeyTwo() {
    this.selectedValue = 1;
    this.check({ value: 1 });
  }

  @HostListener('document:keydown.3')
  onEnterKeyTrhe() {
    this.selectedValue = 2
    this.check({ value: 2 });
  }

}
