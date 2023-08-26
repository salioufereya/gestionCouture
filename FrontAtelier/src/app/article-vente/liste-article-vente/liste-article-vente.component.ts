import { Component, Input, OnInit } from '@angular/core';
import { ArticleVente } from 'src/app/models/ArticleVente';

@Component({
  selector: 'app-liste-article-vente',
  templateUrl: './liste-article-vente.component.html',
  styleUrls: ['./liste-article-vente.component.css']
})
export class ListeArticleVenteComponent implements OnInit {


  @Input() articleVentes!: ArticleVente[] 
  ngOnInit(): void{
    console.log(this.articleVentes);
    
  }

}
