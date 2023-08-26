import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Daum } from 'src/app/models/articles';

@Component({
  selector: '[app-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() listArticle!: any




  @Output() articleId: EventEmitter<number> = new EventEmitter<number>();

  @Output() articleEditId: EventEmitter<number> = new EventEmitter<number>();



  sustra(n: number) {
    return n - 1;

  }

  n: number = 3

  articleClick(e: number, a: Event) {

    const target = a.target as HTMLButtonElement;
    const interval = setInterval(() => {
      this.n = this.n - 1;
      target.textContent = `OK(${this.n})`;
      if (this.n === 0) {

        clearInterval(interval);
        this.n = 3
        target.textContent = "Supp"
      }
    }, 1000);


    if (target.textContent?.includes("OK")) {
      this.articleId.emit(e);
      clearInterval(interval);
    }
  }

  articleClickEdit(e: number) {
    this.articleEditId.emit(e);
  }

}
