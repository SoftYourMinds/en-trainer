import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'config';
import { IReverso } from '../shared/models/reverso.model';
import { IWord } from '../shared/models/word.model';

@Injectable({
  providedIn: 'root'
})
export class ReversoService {

  constructor(private http: HttpClient) { 
  }

  public getContext(text: string, collection_id: string): Observable<IReverso> {
    return this.http.get<IReverso>(`${BASE_URL}/context/${text}&${collection_id}`);
  } 

  public getImages(name: string): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/images/${name}`);
  }

}
