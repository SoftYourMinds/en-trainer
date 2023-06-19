import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackBarService } from '../shared/components/snack-bar/snack-bar.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBar: SnackBarService,
    private autorization: AuthorizationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      catchError((error: any) => {
        if(error.status === 403) {
          this.autorization.unutorize();
          localStorage.removeItem('token');
          this.router.navigate(['/log-in']);
          this.snackBar.openSnackbar("Час сесії скінчився", false);
        }
        throw error; 
      })
    );
  }
}
