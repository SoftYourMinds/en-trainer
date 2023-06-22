import { Component, Input } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { IWord } from 'src/app/shared/models/word.model';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent {
  @Input() word: IWord;
  isExpansed: boolean =  false;

  constructor(
    private ProgressBarService: ProgressBarService,
    private WordService: WordService,
    private SnackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
  }
  
  onExpansionPanel(event: Event): void {
    event.stopPropagation();
    this.isExpansed = !this.isExpansed;
  }

  onDeleteWord() {
    this.ProgressBarService.showProgressBar();
    this.WordService.deleteWord(this.word._id).subscribe({
      next: () => {
        this.SnackBarService.openSnackbar(`"${this.word.word}" - видалено успішно`, true)
        this.WordService.getWordsByCollectionId(this.word.collection_id).subscribe((result) => {
          this.WordService.ressetWords(result)
          this.ProgressBarService.hideProgressBar();
        })
      },
      error: (error) => {
        console.log(error)
        this.ProgressBarService.hideProgressBar()
        this.SnackBarService.openSnackbar(error.error.message, false);
      }
    })
  } 
}

