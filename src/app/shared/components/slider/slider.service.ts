import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private ImagesSubject = new BehaviorSubject<string[]>([])
  public images$ = this.ImagesSubject.asObservable();

  constructor() { }

  setImages(images: string[]) {
    this.ImagesSubject.next(images);
  }
}
