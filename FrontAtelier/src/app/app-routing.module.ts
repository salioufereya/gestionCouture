import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { ArticleComponent } from './article/article.component';
import { ArticleVenteComponent } from './article-vente/article-vente.component';

const routes: Routes = [
  {
    path: 'categorie',
    component: CategorieComponent,
    title: 'Categorie page'
  },
  {
    path: 'article',
    component: ArticleComponent,
    title: 'artcle page'
  },
  {
    path: 'vente',
    component: ArticleVenteComponent,
    title: 'article vente page'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
