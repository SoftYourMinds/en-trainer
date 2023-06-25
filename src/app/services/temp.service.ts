import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'config';
import { Observable } from 'rxjs';

export interface ITempWords {
  wordIds: string[]
}

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private http: HttpClient) { }

  addWordsToTemp(wordIds: ITempWords): Observable<string> {
    return this.http.post<string>(`${BASE_URL}/temp/add`, wordIds);
  }

  getDailyLearnedWords(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/temp/daily/achivments`);
  }

   
}
