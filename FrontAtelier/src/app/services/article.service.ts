import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticleGet, CateInterface } from '../models/categorie';
import { Daum, FetchArticle, SendArticle } from '../models/articles';
import { ArticleWithUrl, Ids, Resp, Root } from '../models/loadCategorie';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RootService {

}
