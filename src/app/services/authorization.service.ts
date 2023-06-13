import { Injectable } from '@angular/core';
import { BASE_URL } from 'config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICredentials } from '../shared/models/user.model';
import { ICandidat } from '../shared/models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient,
   ) { }

  registration(candidat: ICandidat): Observable<string> {
    return this.http.post<string>(`${BASE_URL}/registration`, candidat);
  }

  login(credentials: ICredentials): Observable<string> {
    return this.http.post<string>(`${BASE_URL}/login`, credentials).pipe(
      tap((token: string) => {
        console.log(token)
        
        // localStorage.setItem('token', token);
        // Perform the redirect to the home page here
      }),
      catchError((error: any) => {
        console.log(error)
        // If there is an error, handle it and show a snack bar with the error message
        const errorMessage = error?.message || 'An unknown error occurred';
        // this.appComponent.openSnackbar(errorMessage, true);
        // Open snack bar with the error message
        // You can use a snackbar service or Angular Material's MatSnackBar to display the error message
        console.error(errorMessage); // Log the error for debugging purposes
        return of(errorMessage); // Return the error message as an Observable
      })
    );
  }
  
  logout(){

  }


  
}
