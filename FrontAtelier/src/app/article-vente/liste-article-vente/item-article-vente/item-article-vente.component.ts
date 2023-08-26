import { Component, Input } from '@angular/core';
import { ArticleVente } from 'src/app/models/ArticleVente';

@Component({
  selector: '[app-item-article-vente]',
  templateUrl: './item-article-vente.component.html',
  styleUrls: ['./item-article-vente.component.css']
})
export class ItemArticleVenteComponent {


  @Input() items:ArticleVente[]=[];





}
