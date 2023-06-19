import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private LoaderSubject = new BehaviorSubject<boolean>(false);
  loader$ = this.LoaderSubject.asObservable();

  constructor() { }

  showProgressBar(): void { 
    this.LoaderSubject.next(true)
  }

  hideProgressBar(): void {
    this.LoaderSubject.next(false)
  }
}
