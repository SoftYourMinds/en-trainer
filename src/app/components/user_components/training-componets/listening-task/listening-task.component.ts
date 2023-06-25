import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { SpeachSyntesistService } from 'src/app/shared/fitches/speach-syntesist.service';
import { IWord } from 'src/app/shared/models/word.model';
import { shuffleArray } from 'src/app/shared/fitches/shuffleArray';

@Component({
  selector: 'app-listening-task',
  templateUrl: './listening-task.component.html',
  styleUrls: ['./listening-task.component.scss']
})
export class ListeningTaskComponent  implements OnInit {
  @Input() listeningWord: IWord;
  @Output() listeningAnswer = new EventEmitter<boolean>()

  taskWords: string[];
  afterCorrectAnswer: boolean;
  correctAnswer:string;
  firstAnswer: any;
  images: string[];
  isListeningTaskInit: boolean;
  selectedValue: number;

    constructor(
    private SpeachSyntesist: SpeachSyntesistService,
    private WordService: WordService,
  ) {}

  ngOnInit(): void {
      this.initListeningTask()    
  }

  ngDoCheck(): void {
    if(this.correctAnswer === this.listeningWord.translations[0]) return;
    else this.initListeningTask();
  }

  initListeningTask() {
  
    this.firstAnswer = null;
    this.isListeningTaskInit = false;
    this.afterCorrectAnswer = false;
    this.selectedValue = -1;
    this.taskWords = [];
    console.log(this.listeningWord)

    this.correctAnswer = this.listeningWord.translations[0]; 
    this.taskWords = [this.correctAnswer];

    this.WordService.getTaskListening(this.listeningWord.collection_id, this.listeningWord._id).subscribe((res)=>{
      this.taskWords.push(...res);
      this.taskWords = shuffleArray(this.taskWords);
      this.isListeningTaskInit = true;
      this.SpeachSyntesist.speakText(this.listeningWord.word);
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
    if(this.taskWords[event.value] === this.listeningWord.translations[0]) {
      this.afterCorrectAnswer = true;
    } 
    console.log(event)
  }

  getBackgroundStyle(): any {
    return {
      'background': this.listeningWord.currentImage ? `url(${this.listeningWord.currentImage}) center/cover no-repeat` : '',
      'filter': !this.afterCorrectAnswer ? `blur(40px)` : 'none'
    };
  }

  // відправляю відповідь за завдання, якщо з першого разу вгадав то тру якщо ні то фолс
  emitRespond() { 
    if(!this.afterCorrectAnswer) return
    this.listeningAnswer.emit(this.firstAnswer);
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
