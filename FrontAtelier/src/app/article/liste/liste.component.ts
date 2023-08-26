import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data } from '@angular/router';
import { Daum } from 'src/app/models/articles';
import { Categorie } from 'src/app/models/loadCategorie';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {


  @Input() liste: Data = <Data>{};


  @Output() itemInterClick: EventEmitter<number> = new EventEmitter<number>();

  @Output() itemInterEditClick: EventEmitter<number> = new EventEmitter<number>();


  articleInterClick(itemId: number) {
    this.itemInterClick.emit(itemId);
  }


  articleInterEditClick(itemEditId: number) {
    this.itemInterEditClick.emit(itemEditId);
  }


}
