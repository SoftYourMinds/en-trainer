import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IWord } from 'src/app/shared/models/word.model';
import { SpeachSyntesistService } from 'src/app/shared/fitches/speach-syntesist.service';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-write-task',
  templateUrl: './write-task.component.html',
  styleUrls: ['./write-task.component.scss']
})
export class WriteTaskComponent implements OnInit, AfterViewInit {
  @Input() writeWord: IWord;
  @Output() writeAnswer = new EventEmitter<boolean>()
  @ViewChild('taskInput') taskInput: ElementRef;
  
  correctAnswer: string;
  afterAnswer: boolean; // доступ до функціонала після правильно відповіді користувача
  isWordTaskInit: boolean; // чи ініціалюзувався компонента 

  isCorrect: boolean;
  userInputWord: string = '';
  letterCount: number = 0;
  letterPlaceholder: string = ''; 

  constructor(
    private SpeachSyntesistService: SpeachSyntesistService,
  ) {}

  ngOnInit(): void {
    this.initWriteTask()    
  }

  ngDoCheck(): void {
    if(this.correctAnswer === this.writeWord.word) return;
    this.initWriteTask();
  }

  initWriteTask() {
    this.isWordTaskInit = false;
    
    this.afterAnswer = false;
    this.userInputWord = '',
    this.isCorrect = false;
    this.correctAnswer = this.writeWord.word; 
    this.letterCount = this.correctAnswer.split(' ').join('').length;
    this.letterPlaceholder = `Введи переклад слова (${this.letterCount}) літер`; 

    this.isWordTaskInit = true;
  }

  ngAfterViewInit(): void {
    
  }
  
  check() {
    this.afterAnswer = true;
    console.log(this.userInputWord) 
    if(this.userInputWord === this.writeWord.word) this.isCorrect = true;
    else this.isCorrect = false; 

    console.log('isCorrect', this.isCorrect)
    this.SpeachSyntesistService.speakText(this.writeWord.word);
  }

  // відправляю відповідь за завдання, якщо з першого разу вгадав то тру якщо ні то фолс
  emitRespond() { 
    if(!this.afterAnswer) return
    this.writeAnswer.emit(this.isCorrect);
  }

  @HostListener('document:keydown.enter')
  onEnterKey() {
    if(this.afterAnswer) this.emitRespond();
    else this.check();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if(event.key === 'Enter') return; 
    try {
      if(this.taskInput.nativeElement) this.taskInput.nativeElement.focus() 
    } catch (error) {
      return;
    }    
  }


  getInputColor(): ThemePalette {
    if(this.afterAnswer && !this.isCorrect) return 'warn';
    else return 'primary';
  }

  getBackgroundStyle(): any {
    return {
      'background': this.writeWord.currentImage ? `url(${this.writeWord.currentImage}) center/cover no-repeat` : '',
      'filter': !this.afterAnswer ? `blur(40px)` : 'none'
    };
  }

}
