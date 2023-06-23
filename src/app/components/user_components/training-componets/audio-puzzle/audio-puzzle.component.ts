import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SpeachSyntesistService } from 'src/app/shared/fitches/speach-syntesist.service';
import { IWord } from 'src/app/shared/models/word.model';
import { shuffleArray } from 'src/app/shared/fitches/shuffleArray';

@Component({
  selector: 'app-audio-puzzle',
  templateUrl: './audio-puzzle.component.html',
  styleUrls: ['./audio-puzzle.component.scss']
})
export class AudioPuzzleComponent implements OnInit {
  @Input() audioPuzzleWord: IWord;
  @Output() audioPuzzleAnswer = new EventEmitter<boolean>()

  afterCorrectAnswer: boolean = false;
  correctAnswer: string = '';
  isAudioPuzzleInit: boolean = false;
  firstAnswer: boolean = true;

  tamplateWordArray: string[][]; //for empty squares
  wrongWordArray: string[]; // for random generated quaue each letter separatly
  correctWordArray: string[][]; // for right quaue
  
  currentLetterIndexI:number = 0;
  currentLetterIndexJ:number = 0;
  
  isCorrect: boolean[][];
  isDisabled: boolean[];

  indexes: number[] = []


  constructor(
    private SpeachSyntesist: SpeachSyntesistService,
  ) {}

  ngOnInit(): void {
      this.initAudioPuzzle()    
  }

  ngDoCheck(): void {
    if(this.correctAnswer === this.audioPuzzleWord.word) return;
    else this.initAudioPuzzle();
  }

  initAudioPuzzle() {
    this.indexes = [];
    this.currentLetterIndexI = 0;
    this.currentLetterIndexJ = 0;
    this.firstAnswer = true;
    this.isAudioPuzzleInit = false;
    this.afterCorrectAnswer = false;
    this.correctAnswer = this.audioPuzzleWord.word;
    
 
    this.tamplateWordArray = this.audioPuzzleWord.word.split(' ').map(el => [...el]);
    console.log('tamplate',this.tamplateWordArray)
    this.wrongWordArray = shuffleArray(this.audioPuzzleWord.word.split(' ').join('').split(''))
    console.log('wrong', this.wrongWordArray)  
    this.correctWordArray = this.audioPuzzleWord.word.split(' ').map(el => [...el]);
    console.log('correct', this.correctWordArray)

    this.isCorrect = this.audioPuzzleWord.word.split(' ').map(word => Array(word.length).fill(false));
    
    this.isDisabled = new Array(this.wrongWordArray.length);
    this.isDisabled.fill(false);

    this.isAudioPuzzleInit = true;
    this.SpeachSyntesist.speakText(this.audioPuzzleWord.word);
  }

  getIsCorrect(i: number, j: number) {
    return this.isCorrect[i][j];
  }

  getIsDisabled(i: number) {
    return this.isDisabled[i];
  }


  check(pointedLetter: string, i: number) { 
    if(this.firstAnswer) { //якщо відповідь така яка йтиме у батьківську компоненту правильна
      if(this.correctWordArray[this.currentLetterIndexI][this.currentLetterIndexJ] !== // то перевіряємо чи це так і на цей раз і якщо ні то вже буде відомо що завдання не правильне
        pointedLetter) this.firstAnswer = false; // first wrong answer
    }

    if(pointedLetter === this.correctWordArray[this.currentLetterIndexI][this.currentLetterIndexJ]) {//3 3
        this.isCorrect[this.currentLetterIndexI][this.currentLetterIndexJ] = true;
        this.isDisabled[i] = true;
        this.currentLetterIndexJ+=1;
        if(this.correctWordArray[this.currentLetterIndexI][this.currentLetterIndexJ] === undefined) {
          this.currentLetterIndexI+=1;
          this.currentLetterIndexJ=0;
        }
    } 
  
    let maxIndexWords = this.audioPuzzleWord.word.split(' ').length;
 
    if(this.currentLetterIndexI === maxIndexWords ) {
      this.afterCorrectAnswer = true;
      this.SpeachSyntesist.speakText(this.audioPuzzleWord.word);
      return;
    }
  }

  getBackgroundStyle(): any {
    return {
      'background': this.audioPuzzleWord.currentImage ? `url(${this.audioPuzzleWord.currentImage}) center/cover no-repeat` : '',
      'filter': !this.afterCorrectAnswer ? `blur(40px)` : 'none'
    };
  }

  // відправляю відповідь за завдання, якщо з першого разу вгадав то тру якщо ні то фолс
  emitRespond() { 
    if(!this.afterCorrectAnswer) return
    this.audioPuzzleAnswer.emit(this.firstAnswer);
  }

  @HostListener('document:keydown.enter')
  onEnterKey() {
     this.emitRespond();
  }

  @HostListener('document:keydown', ['$event'])
  onAnyKey(event: KeyboardEvent) {
    let currentIndex = this.wrongWordArray.indexOf(event.key);
    let isTyped = this.indexes.find(el => el === currentIndex);
    if(isTyped) currentIndex = this.wrongWordArray.indexOf(event.key, isTyped+1)
    this.check(event.key, currentIndex);
    this.indexes.push(currentIndex);
}

}

