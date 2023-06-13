import { Injectable } from '@angular/core';
import { BASE_URL } from 'config';
import { HttpClient } from '@angular/common/http';

export interface IAllowedDomain {
  domain: string
}

export interface IForbiddenWord {
  word: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private forbiddenWordsUrl = `${BASE_URL}/forbiddenWords`;
  private allowedDomainsUrl = `${BASE_URL}/allowedDomains`;

  constructor(private http: HttpClient) { }

  getAllowedDomains() {
    return this.http.get<IAllowedDomain[]>(this.allowedDomainsUrl)
  }

  getForbiddenWords() {
    return this.http.get<IForbiddenWord[]>(this.forbiddenWordsUrl)
  }

  
}
