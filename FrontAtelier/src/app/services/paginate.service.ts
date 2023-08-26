import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleWithUrl } from '../models/loadCategorie';


@Injectable({
    providedIn: 'root'
})
export class PaginateService {
    url: string = "http://127.0.0.1:8000/api/article"
    constructor(private http: HttpClient) { }


    getUrl(url: string): Observable<ArticleWithUrl> {
        return this.http.get<ArticleWithUrl>(url);
    }






}
