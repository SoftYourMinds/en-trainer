import { Component } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import { IWord } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
  collectionId: string;
  words: IWord[];

  constructor(
    private route: ActivatedRoute,
    private WordService: WordService,
  ){ }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.collectionId = params['id'];
    });

    this.WordService.getTrainingWords(this.collectionId).subscribe((res) => {
      this.words = res;
      console.log(this.words)
    })
  }

  getAnswer(event: boolean) {
    console.log(event);
  }



  

}
