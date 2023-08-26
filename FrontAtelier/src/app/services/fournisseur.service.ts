import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CateInterface, categorieInterface } from '../models/categorie';
import { Fournisseur, Root } from '../models/loadCategorie';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  url: string = "http://127.0.0.1:8000/api/fournisseur";
  constructor(private http: HttpClient) { }


  search(libelle: any): Observable<Root> {
    return this.http.post<Root>(this.url + "/search", libelle);
  }
}
