import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadMoreService {
  private LoaderSubject = new BehaviorSubject<boolean>(false);
    public loader$ = this.LoaderSubject.asObservable();

  constructor() { }

  isLoading(state: boolean) {
    this.LoaderSubject.next(state)
  }
}
