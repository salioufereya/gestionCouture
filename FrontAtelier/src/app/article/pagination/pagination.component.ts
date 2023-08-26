import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataWithUrl, Links } from 'src/app/models/categorie';
import { ArticleAll, ArticleWithUrl } from 'src/app/models/loadCategorie';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {


  lien!: Array<Links>;

  @Input() dataChildToPaginate: ArticleWithUrl = <ArticleWithUrl>{};
  constructor() { }

  @Output() paginer = new EventEmitter<string>();


  paginate(str: any) {
    return this.paginer.emit(str);
  }

}
