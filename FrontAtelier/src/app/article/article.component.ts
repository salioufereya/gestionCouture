import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { CategorieService } from '../services/categorie.service';
import { ArticleGet, CateInterface, GetArticle, categorieInterface, ids } from '../models/categorie';
import { FournisseurService } from '../services/fournisseur.service';
import { Observable, take } from 'rxjs';
import { FetchArticle } from '../models/articles';
import { Data } from '@angular/router';
import { Article, ArticleAll, ArticleWithUrl, Categorie, Fournisseur, Ids, Link, Root, Resp } from '../models/loadCategorie';
import { PaginateService } from '../services/paginate.service';
import { FormeComponent } from './forme/forme.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  existA: boolean = false;
  modif: boolean = false;
  @ViewChild(FormeComponent) childForm?: FormeComponent;

  constructor(private articleService: ArticleService, private categoriesService: CategorieService, private fourniService: FournisseurService, private paginate: PaginateService) {

  }
  public libelle: categorieInterface = <categorieInterface>{};
  public articlesAll: Array<ArticleAll> = [];
  public articles: Array<Article> = [];
  public categories: Array<Categorie> = [];
  public fournisseurs: Array<Fournisseur> = [];
  supp: boolean = false;
  lien!: Array<Link>;
  pageActuelle: number = 0
  public dataToPaginate: ArticleWithUrl = <ArticleWithUrl>{};


  @ViewChild(FormeComponent) formComponent!: FormeComponent;


  public articleToEdit: Array<Article> = [];
  public fourni: CateInterface = <CateInterface>{};
  test: categorieInterface = <categorieInterface>{};
  id: Array<number> = [];
  fournisseur: Array<Fournisseur> = [];
  article: string = "article";
  ngOnInit(): void {
    this.articleService.all<Root>(this.article).subscribe(
      (value) => {
        this.articles = value.data.article.data
        this.categories = value.data.categorie
        this.fournisseurs = value.data.fournisseur
        this.articlesAll = value.data.articleAll
        this.dataToPaginate = value.data.article
        console.log(this.articlesAll);

      }
    )
  }
  getUrl(url: string) {
    this.paginate.getUrl(url).subscribe(
      (value: any) => {
        console.log(value);
        this.dataToPaginate = value.data.article
        this.articles = value.data.article.data;
        this.pageActuelle = value.data.article.current_page;
        this.lien = value.data.article.links
        console.log(this.articles);
      }
    )
  }

  receivedFormData: Article = <Article>{};
  receiveFormData(formData: Article) {
    if (this.formComponent.bool) {
      this.addArticle(formData);
    } else if (!this.formComponent.bool) {
      console.log(formData);
      console.log(this.articleToEdit[0].id);
      let id = this.articleToEdit[0].id
      this.update(formData, id);
    }
  }

  addArticle(data: Article) {
    return this.articleService.add<Resp, Article>(this.article, data).subscribe(
      (val) => {
        console.log(val);
        if (val.code == 200) {
          this.articles.unshift(val.data);
          this.existA = true;
          this.childForm?.resetForm();
          this.formComponent.forme.patchValue({ 'photo':"https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_29/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/90min_fr_international_web/01h2xeffn7yx4azff47s.jpg"});
          this.childForm!.fournisseurDisplay = [];
          setTimeout(() => {
            this.existA = false
          }, 5000);
        }
        this.childForm!.fournisseurDisplay = [];
      },
      error => console.error(error)
    )
  }

  ItemParentClick(itemId: number) {
    let id = {
      "id": itemId
    }
    this.deleteArticle(id);
  }
  ItemParentEditClick(itemId: number) {
    this.articleToEdit = this.articles.filter(article => article.id == itemId);
  }
  update(body: Article, id: number) {
    return this.articleService.update<Resp, Article>(this.article, body, id).subscribe(
      data => {
        if (data.code == 200) {
          this.modif = true;
          this.childForm?.resetForm();
          this.formComponent.forme.patchValue({ 'photo':"https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_29/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/90min_fr_international_web/01h2xeffn7yx4azff47s.jpg"});
          const index = this.articles.findIndex(item => item.id === id);
          if (index !== -1) {
            this.articles[index] = data.data;
          }

          this.childForm!.fournisseurDisplay = [];
          setTimeout(() => {
            this.modif = false
          }, 5000);
        }

      }, error => {
        console.log(error);
      }
    )
  }

  deleteArticle(id: Ids) {
    return this.articleService.delete<Response>(id, this.article).subscribe(
      (value) => {
        this.articles = this.articles.filter(article => article.id !== id.id);
        this.supp = true;
        setTimeout(() => {
          this.supp = false;
        }, 5000);
      });
  }
}
