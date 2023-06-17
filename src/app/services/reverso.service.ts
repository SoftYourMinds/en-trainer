import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'config';

@Injectable({
  providedIn: 'root'
})
export class ReversoService {

  constructor(private http: HttpClient) { 
  }

  public getImages(name: string): Observable<string[]> {
    return this.http.get<string[]>(`${BASE_URL}/images/${name}`);
  }


}
