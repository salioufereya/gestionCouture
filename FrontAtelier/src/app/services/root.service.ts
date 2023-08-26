import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ids } from '../models/loadCategorie';
@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(protected http: HttpClient) { }

  url: string = environment.url;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
  all<T>(next: string): Observable<T> {
    return this.http.get<T>(this.url + `/${next}` + '/all');
  }

  add<T, U>(next: string, data: U): Observable<T> {
    return this.http.post<T>(this.url + `/${next}` + '/add', data);
  }

  delete<T>(id: Ids, next: string): Observable<T> {
    return this.http.delete<T>(this.url + `/${next}` + '/delete', { body: id });
  }

  update<T, U>(next: string, data: U, id: number): Observable<T> {
    return this.http.post<T>(this.url + `/${next}` + '/editer/' + `${id}`, data)
  }
  byId<T>(id: number, next: string) {
    return this.http.get<T>(this.url + `/${next}/${id})`)
  }
}
