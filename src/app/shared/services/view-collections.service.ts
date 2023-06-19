import { Injectable,  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const CollectionViewStyle = Object.freeze({
  grid: 'grid',
  list: 'list'
}) 


@Injectable({
  providedIn: 'root'
})
export class ViewCollectionsService {
  private ViewCollectionStyleSubject = new BehaviorSubject<string>(CollectionViewStyle.grid);
  public collectionViewStyle$ = this.ViewCollectionStyleSubject.asObservable()

  constructor() { }

  public setCollectionViewStyle(style: typeof CollectionViewStyle[keyof typeof CollectionViewStyle]) {
    this.ViewCollectionStyleSubject.next(style);
  }
  
  
}
