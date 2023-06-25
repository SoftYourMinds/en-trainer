import { Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-word-panel',
  templateUrl: './word-panel.component.html',
  styleUrls: ['./word-panel.component.scss']
})
export class WordPanelComponent implements OnInit {
  @Input() collection_id: string;
  trainingWordsCount: number = 0;
  oldCollectionId: string;
  constructor(
    private WordService: WordService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(this.oldCollectionId === this.collection_id) return;
    this.initWordPanel();
  }
  
  initWordPanel() {
    this.oldCollectionId = this.collection_id;
    this.WordService.getTrainingWords(this.collection_id).subscribe((res) => {
      this.trainingWordsCount = res.length;
    })
  }
  
  openTrainingPage() {
    this.router.navigate(['/training', this.collection_id]);
  }



}
