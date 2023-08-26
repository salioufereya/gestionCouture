import { Component } from '@angular/core';
import { ArticleVenteServiceService } from '../services/article-vente-service.service';
import { ArticleConfection, ArticleVente, Vente } from '../models/ArticleVente';

@Component({
  selector: 'app-article-vente',
  templateUrl: './article-vente.component.html',
  styleUrls: ['./article-vente.component.css']
})
export class ArticleVenteComponent {


  ventes: string = 'articleVente'

  articleVentes: ArticleVente[] = [];
  constructor(private articleVenteSerive: ArticleVenteServiceService) { }

  ngOnInit(): void {
    this.articleVenteSerive.all<Vente<ArticleVente>>(this.ventes).subscribe(
      (value) => {
        this.articleVentes = value.data;
        console.log(this.articleVentes);
      }
    )
  }





}
