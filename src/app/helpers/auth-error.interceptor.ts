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

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBar: SnackBarService 
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      catchError((error: any) => {
        if(error.status === 403) {
          this.router.navigate(['/log-in']);
          this.snackBar.openSnackbar(error.error.meassage, false);
        }
        throw error; 
      })
    );
  }
}
