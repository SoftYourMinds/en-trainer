import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICollection } from '../shared/models/collection.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from 'config';
import { HttpParams } from '@angular/common/http';
import { IWord } from '../shared/models/word.model';

export interface IPagerParams {
  page: number,
  pageSize: number,
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private CollectionsSubject = new BehaviorSubject<ICollection[]>([]);
  public collections$ = this.CollectionsSubject.asObservable();

  public startPagerParams: IPagerParams = {
    page: 1,
    pageSize: 5,
  } 

  private PagerParamsSubject = new BehaviorSubject<IPagerParams>(this.startPagerParams);
  public pagerParams$ = this.PagerParamsSubject.asObservable();

  constructor(private http: HttpClient) { 
  }

  ressetCollections(collections: ICollection[]) {
    this.CollectionsSubject.next(collections);
  }

  pushCollections(collections: ICollection[]) {
    this.CollectionsSubject.next([...this.CollectionsSubject.getValue(), ...collections])
  }

  setPagerParams(newPagerParams: IPagerParams) {
    this.PagerParamsSubject.next(newPagerParams)
  }

  createCollection(collection: ICollection): Observable<ICollection> {
    return this.http.post<ICollection>(`${BASE_URL}/collection/create/`, collection);
  }
  
  getCollectionsByParentId(parent_id: string | null): Observable<ICollection[]> {
    return this.http.get<ICollection[]>(`${BASE_URL}/collection/parent/${parent_id}&${this.startPagerParams.page}&${this.startPagerParams.pageSize}`);
  }

  loadMoreCollections(parent_id: string | null, page: number, pageSize: number): Observable<ICollection[]> {
    return this.http.get<ICollection[]>(`${BASE_URL}/collection/parent/${parent_id}&${page}&${pageSize}`);
  }

  editCollection(id_collection: string, collection: ICollection ): Observable<ICollection> {
    return this.http.put<ICollection>(`${BASE_URL}/collection/${id_collection}`, collection);
  } 

  deleteCollection(id: string):Observable<ICollection> {
    return this.http.delete<ICollection>(`${BASE_URL}/collection/${id}`);

  }

  getNumberOfAllCollections(collection_id: string):Observable<number> {
    return this.http.get<number>(`${BASE_URL}/collections/count/${collection_id}`);
  }

  getAncestorsByCollectionId(collection_id: string):Observable<ICollection[]> {
    return this.http.get<ICollection[]>(`${BASE_URL}/collection/ancestors/${collection_id}`)
  }

}
