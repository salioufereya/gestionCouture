import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    url: string = "http://127.0.0.1:8000/api/article"
    constructor(private http: HttpClient) { }


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
    };
    getArticle(id: number): Observable<any> {
        return this.http.post<any>(this.url + "/image", id);
    }


}
