import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { WordService } from 'src/app/services/word.service';
import { SliderService } from 'src/app/shared/components/slider/slider.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { SpeachSyntesistDirective } from 'src/app/shared/fitches/speach-syntesist.directive';
import { SpeachSyntesistService } from 'src/app/shared/fitches/speach-syntesist.service';
import { IWord } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-task-choise',
  templateUrl: './task-choise.component.html',
  styleUrls: ['./task-choise.component.scss'],
})
export class TaskChoiseComponent implements OnInit{
  @Input() word: IWord;
  @Output() answer = new EventEmitter<boolean>()
  taskWords: string[];

  afterCorrectAnswer: boolean;
  correctAnswer:string;
  firstAnswer: boolean;
  

  images: string[];
  constructor(
    private SpeachSyntesist: SpeachSyntesistService,
    private SliderService: SliderService,
    private SnackBarService: SnackBarService,
    private WordService: WordService,
  ) {
    this.afterCorrectAnswer = false;
    
  }

  ngOnInit(): void {
    this.SpeachSyntesist.speakText(this.word.word);
    this.correctAnswer = this.word.translations[0]; 
    this.taskWords = [this.word.translations[0]];
  
    this.WordService.getTaskChoice(this.word.collection_id, this.word._id).subscribe((res)=>{
      this.taskWords.push(...res)
    })
    
  }

  check(event: any){
    if(this.firstAnswer == undefined) {
      if(event.value === this.correctAnswer) this.firstAnswer = true;
      else this.firstAnswer = false;  
    }
    if(event.value === this.word.translations[0]) {
      this.afterCorrectAnswer = true;
    } 
  }

  getBackgroundStyle(): any {
    return {
      'background': this.word.currentImage ? `url(${this.word.currentImage}) center/cover no-repeat` : '',
      'filter': !this.afterCorrectAnswer ? `blur(40px)` : 'none'
    };
  }

  emitRespond(){
    if(!this.afterCorrectAnswer) return
    this.answer.emit(this.firstAnswer);
  }




}
