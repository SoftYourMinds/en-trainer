import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from 'config';
import { ISendWord, IWord } from '../shared/models/word.model';
import { IPagerParams } from './collection.service';
import { ITempWords } from './temp.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private WordsSubject = new BehaviorSubject<IWord[]>([]);
  public words$ = this.WordsSubject.asObservable();

  public startWordsPagerParams: IPagerParams = {
    page: 1,
    pageSize: 5,
  } 

  private PagerWordsParamsSubject = new BehaviorSubject<IPagerParams>(this.startWordsPagerParams);
  public pagerWordsParams$ = this.PagerWordsParamsSubject.asObservable();


  private WordExistSubject = new BehaviorSubject<boolean>(false);
  public SerchedWordExist$ = this.WordExistSubject.asObservable();


  constructor(private http: HttpClient) { 
  }

  setWordIsExist(isExist: boolean) {
    this.WordExistSubject.next(isExist)
  }

  getWordIsExist() {
    return this.WordExistSubject.getValue()
  }

  ressetWords(words: IWord[]) {
    this.WordsSubject.next(words);
  }

  pushWords(words: IWord[]) {
    this.WordsSubject.next([...this.WordsSubject.getValue(), ...words])
  }

  setPagerWordsParams(newPagerParams: IPagerParams) {
    this.PagerWordsParamsSubject.next(newPagerParams)
  }

  // USING HTTP METHODS

  addNewWord(word: ISendWord): Observable<IWord> {
    return this.http.post<IWord>(`${BASE_URL}/word/create/`, word);
  }
  
  getWordsByCollectionId(collection_id: string): Observable<IWord[]> {
    return this.http.get<IWord[]>(`${BASE_URL}/word/${collection_id}&1&5`);
  }

  loadMoreWords(collection_id: string, page: number, pageSize: number): Observable<IWord[]> {
    return this.http.get<IWord[]>(`${BASE_URL}/word/${collection_id}&${page}&${pageSize}`);
  }

  
  deleteWord(id: string): Observable<IWord> {
    return this.http.delete<IWord>(`${BASE_URL}/word/delete/${id}`);
  }

  getTrainingWords(collection_id: string): Observable<IWord[]> {
    return this.http.get<IWord[]>(`${BASE_URL}/words/training/${collection_id}`);
  }

  getTaskListening(collection_id: string, word_id: string): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/word/task/listening/${collection_id}&${word_id}`);
  }

  getTaskChoice(collection_id: string, word_id: string): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/word/task/choice/${collection_id}&${word_id}`);
  }
  
  getTotalLearnedWordCount(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/word/total/count/`);
  }
  
  getGlobalTrainingCount(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/words/globalTrainingCount/`);
  }
  
  updateWordsStatus(wordIds: ITempWords): Observable<string> {
    return this.http.put<string>(`${BASE_URL}/word/update/status/`, wordIds);
  }

  getCollectionWordsForTrainingCount(collection_id: string): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/words/collectionTrainingCount/${collection_id}`);
  }
  
}
