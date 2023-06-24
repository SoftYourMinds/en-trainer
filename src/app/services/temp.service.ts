import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private http: HttpClient) { }

  addWordsToTemp(wordsIds: string[]): Observable<string> {
    return this.http.post<string>(`${BASE_URL}/temp/add`, wordsIds);
  }

  getDailyLearnedWords(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/temp/daily/achivments`);
  }

   
}
