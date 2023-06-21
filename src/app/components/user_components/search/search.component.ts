import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ReversoService } from 'src/app/services/reverso.service';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError, filter } from 'rxjs/operators';
import { ISendWord, IWord } from 'src/app/shared/models/word.model';
import { WordService } from 'src/app/services/word.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() collection_id: string;

  searchTerm: string = '';
  searchResults: string[] = [];
  isLoading: boolean = false;
  isActive: boolean = false;
  word: IWord;
  wordCandidat: ISendWord;
  isSerchedWordExist: boolean;

  private searchTerms = new Subject<string>();

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private ProgresBarService: ProgressBarService,
    private reverso: ReversoService,
    private WordService: WordService) {
    this.searchResults = []
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((term: string) => term.trim() !== ''), // Перевірка на порожнє поле
        switchMap((term: string) => {
          this.isLoading = true;
          return this.reverso.getContext(term, this.collection_id).pipe(
            catchError((error) => of({ translations: ['No results found for this query'] }))
          );
        })
      )
      .subscribe((res:any) => {
        console.log(res)

        if('word' in res) {
          this.WordService.ressetWords([res]);
          this.searchResults = [];
          this.word = res;
          this.WordService.setWordIsExist(true)          
        } else {
          this.WordService.setWordIsExist(false);
          this.searchResults = res.translations;
          this.wordCandidat = {
            'word': res.text,
            'collection_id': this.collection_id,
            'examples': res.examples,
            'translations': res.translations
          }
          this.WordService.SerchedWordExist$.subscribe((res)=> {
            this.isSerchedWordExist = res;
          })
    
        }
        
        this.isLoading = false;
      });

    // Слідкування за кліками на документі
    document.addEventListener('click', (event: MouseEvent) => {
      if (!this.searchInput.nativeElement.contains(event.target as Node)) {
         this.clearSearch() ;
      }
    });
  }

  ngDoCheck(): void {
    if(this.isSerchedWordExist === this.WordService.getWordIsExist()) return;
    else this.isSerchedWordExist = this.WordService.getWordIsExist();
    
  }

  onInput(): void {
    this.searchTerms.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];

    
    if(this.WordService.getWordIsExist()){

      this.ProgresBarService.showProgressBar();
      this.WordService.setWordIsExist(false)
      this.WordService.getWordsByCollectionId(this.word.collection_id).subscribe((result) => {
        this.WordService.ressetWords(result);
        this.ProgresBarService.hideProgressBar()
      });
      
    }
  }

  addNew(event: MouseEvent ) {
    const  target = event.target as HTMLElement;
    if (target.classList.contains('mat-mdc-button-touch-target')) {
      // Клас mat-mdc-button-touch-target присутній в таргеті
      this.ProgresBarService.showProgressBar()    
      this.WordService.addNewWord(this.wordCandidat).subscribe((result) => {
        this.WordService.getWordsByCollectionId(this.collection_id).subscribe((result) => {
          this.WordService.ressetWords(result);
          this.ProgresBarService.hideProgressBar();
        })
      })
      
      // Додаткові дії
    }
  }
}
