import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleInterface, CateInterface, DataWithUrl, categorieInterface, ids } from '../models/categorie';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  //url :string= environment.baseUrl;
  url: string = "http://127.0.0.1:8000/api/categorie"
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };

  getCategories(page?: number): Observable<DataWithUrl> {
    return this.http.get<DataWithUrl>(this.url + "/all" + '?page=' + page);
  }

  getCategoriesAll(): Observable<CateInterface> {
    return this.http.get<CateInterface>(this.url + "/index");
  }
  addCategorie(category: categorieInterface): Observable<categorieInterface> {
    return this.http.post<categorieInterface>(this.url + "/add", category, this.httpOptions);
  }

  searchCategories(libelle: categorieInterface): Observable<ArticleInterface> {
    return this.http.post<ArticleInterface>(this.url + "/search", libelle);
  }

  getUrl(url: string): Observable<DataWithUrl> {
    return this.http.get<DataWithUrl>(url);
  }

  deleteCategories(category: ids): Observable<ids> {
    return this.http.delete<ids>(this.url + "/delete", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',

      }),
      body: category
    })
  }

  updateCatégorie(categorie: categorieInterface, id: number): Observable<categorieInterface> {
    return this.http.put<categorieInterface>(this.url + `${id}/update`, categorie, this.httpOptions)
  }

}


