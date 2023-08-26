import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { FormeComponent } from './article/forme/forme.component';
import { ListeComponent } from './article/liste/liste.component';
import { ItemComponent } from './article/liste/item/item.component';
import { PaginationComponent } from './article/pagination/pagination.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';
import { FormArticleVenteComponent } from './article-vente/form-article-vente/form-article-vente.component';
import { ListeArticleVenteComponent } from './article-vente/liste-article-vente/liste-article-vente.component';
import { ItemArticleVenteComponent } from './article-vente/liste-article-vente/item-article-vente/item-article-vente.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormeComponent,
    ListeComponent,
    ItemComponent,
    PaginationComponent,
    ArticleVenteComponent,
    FormArticleVenteComponent,
    ListeArticleVenteComponent,
    ItemArticleVenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
