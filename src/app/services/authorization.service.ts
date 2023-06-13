import { Injectable } from '@angular/core';
import { BASE_URL } from 'config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICredentials, IUser } from '../shared/models/user.model';
import { ICandidat } from '../shared/models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


export interface IToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public LoggInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.LoggInSubject.asObservable();

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
    if(localStorage.getItem('token')) this.autorize();
  }

  registration(candidat: ICandidat): Observable<string> {
    return this.http.post<string>(`${BASE_URL}/registration`, candidat);
  }

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(`${BASE_URL}/login`, credentials).pipe(
      tap((result) => {
        localStorage.setItem('token', result.token)
        this.autorize()
      }),
      catchError((error: any) => {
        const errorMessage = error.error.meassage;
        console.error(errorMessage); 
        return of(errorMessage); 
      })
    );
  }
  
  autorize() {
    this.LoggInSubject.next(true)
  }

  unutorize() {
    this.LoggInSubject.next(false)
  }


  logout() {
    localStorage.removeItem('token')
    this.unutorize();
  }

  getUser():IUser {
    const token:string = localStorage.getItem('token') || '';
    const decoded:any = this.jwtHelper.decodeToken(token);
    return {
      _id: decoded?._id,
      email: decoded?.email,
      roles: decoded?.roles, 
    }
  }

}
