import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICollection } from '../shared/models/collection.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from 'config';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private CollectionsSubject = new BehaviorSubject<ICollection[]>([]);
  public collections$ = this.CollectionsSubject.asObservable();

  constructor(private http: HttpClient) { 
  }

  ressetCollections(collections: ICollection[]) {
    this.CollectionsSubject.next(collections);
  }

  createCollection(collection: ICollection): Observable<ICollection> {
    return this.http.post<ICollection>(`${BASE_URL}/collection/create/`, collection);
  }
  
  getCollectionsByParentId(parent_id: string | null): Observable<ICollection[]> {
    return this.http.get<ICollection[]>(`${BASE_URL}/collection/parent/${parent_id}`);
  }

  editCollection(id_collection: string, collection: ICollection ): Observable<ICollection> {
    return this.http.put<ICollection>(`${BASE_URL}/collection/${id_collection}`, collection);
  } 

  deleteCollection(id: string):Observable<ICollection> {
    return this.http.delete<ICollection>(`${BASE_URL}/collection/${id}`);

  }

  getNumberOfAllCollections():Observable<number> {
    return this.http.get<number>(`${BASE_URL}/collections/count/`);
  }

}
