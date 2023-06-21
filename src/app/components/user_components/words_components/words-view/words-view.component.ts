import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IWord } from 'src/app/shared/models/word.model';
import { IPagerParams } from 'src/app/services/collection.service';
import { WordService } from 'src/app/services/word.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'app-words-view',
  templateUrl: './words-view.component.html',
  styleUrls: ['./words-view.component.scss']
})
export class WordsViewComponent {
  @Input() collection_id: string;

  pager: IPagerParams;
  isWordsLoadMore: boolean;
  isWordsFullLoad: boolean;
  isFirstWordsPageInit: boolean;
  public words: IWord[];

  oldCollectionId: string;
  isSearchedWordExist: boolean;

  constructor(
    public WordsService: WordService,
    public ProgressBarService: ProgressBarService,
    public SnackBarService: SnackBarService,
  ){
    this.pager = {page: 2, pageSize: 5};
    this.isWordsLoadMore= false;
    this.isWordsFullLoad = false;
    this.isFirstWordsPageInit = false;
  }

  ngOnInit(): void {
    this.initWords();
  }

  ngDoCheck(): void {
    if(this.collection_id === this.oldCollectionId) return;
    this.initWords();
  }
  
  initWords() {
        
    this.oldCollectionId = this.collection_id;
    this.ProgressBarService.showProgressBar()

    this.WordsService.SerchedWordExist$.subscribe((serchedWord)=>{
      this.isSearchedWordExist = serchedWord;
    })
   
    this.WordsService.getWordsByCollectionId(this.collection_id).subscribe({
      next: (result: IWord[]) => {
        // this.pager.page += 1;
        this.isFirstWordsPageInit = true;
        this.WordsService.ressetWords(result);
        this.ProgressBarService.hideProgressBar();
      },
      error: (error) => {
        this.ProgressBarService.hideProgressBar()
        this.SnackBarService.openSnackbar(error, true);
      }
    })

    this.WordsService.words$.subscribe((words) => {
        this.words = words;
        if(words.length <= 5) {
          if(this.isFirstWordsPageInit) {
            this.isWordsFullLoad = false;
            this.pager.page = 2;
          }
        }
      })
  }
   
  loadMoreWords(onPageEnd: boolean) {

    if (!this.isFirstWordsPageInit) return;
    console.log("words first init")

    if(this.isSearchedWordExist) return
    console.log("not exist")

    if (onPageEnd && this.isWordsFullLoad) return;
    console.log("no full load")
    
    this.isWordsLoadMore = true;
        
    this.WordsService.loadMoreWords(this.collection_id, this.pager.page, this.pager.pageSize).subscribe((result) => {
        if (result.length > 0) {
          this.pager.page += 1;
          this.isWordsLoadMore= false;
          console.log("words end of page")
          this.WordsService.pushWords(result);
         } else {
          console.log('that s all')
          this.isWordsFullLoad = true;
          this.isWordsLoadMore = false;
        }
    });
  }

}
