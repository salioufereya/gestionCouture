import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { Observable } from 'rxjs';
import { ArticleInterface, DataWithUrl, Links, categorieInterface, ids } from '../models/categorie';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  libelleForm = new FormGroup({
    libelle: new FormControl('', [Validators.required,
    Validators.minLength(3)]),
    type: new FormControl('', [Validators.required,
    Validators.minLength(3)])

  })

  public categories: categorieInterface[] = [];
  constructor(private _categorieService: CategorieService) {
  }
  isInputDisabled: boolean = true;
  btnSupprimer: boolean = false;
  btnAjouter: boolean = false;
  allsCategorie: number = 0;
  pagination: number = 1;
  condition: boolean = false;
  condition1: boolean = false;
  success: boolean = false;
  supp: boolean = false;
  clikable: boolean = false;
  selectH: boolean = false;
  isLastPage: boolean = false;
  oky: boolean = false;
  idEdit: number = 0
  modifie: boolean = false
  lien!: Array<Links>;
  pageActuelle: number = 0
  ad: boolean = true
  canette: boolean = true

  ids: number[] = [];
  public libelle!: any;


  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    return this._categorieService.getCategories(this.pageActuelle).subscribe(
      (value: DataWithUrl) => {
        this.categories = value.data;
        this.pageActuelle = value.meta.current_page;
        this.lien = value.meta.links
        console.log(value.meta.links);
        console.log(this.lien);
        console.log(this.pageActuelle);
        this.allsCategorie = value.meta.total;
        console.log(this.categories);
      }
    )
  }

  getUrl(url: string) {
    this._categorieService.getUrl(url).subscribe(
      (value: DataWithUrl) => {
        this.categories = value.data;
        this.pageActuelle = value.meta.current_page;
        this.lien = value.meta.links
        // console.log(this.lien);
      }
    )
  }
  addCategorie() {
    this.libelle = {
      "libelle": this.libelleForm.value.libelle as string,
      "type": this.libelleForm.value.type as string
    }
    console.log(typeof this.libelleForm.value.libelle);
    console.log(this.libelleForm.value.libelle);
    return this._categorieService.addCategorie(this.libelle).subscribe(
      value => {
        console.log(value);
        this.libelleForm.reset();
        this.getCategories();
        this.success = true;
        this.btnAjouter = false;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }, error => {
        console.log(error);
      }
    );

  }
  renderPage(event: number) {
    this.pagination = event;
    this.getCategories();
  }



  activateBtn(event: Event) {
    return ((event.target as HTMLInputElement).value);
  }

  search() {
    this.libelle = {
      "libelle": this.libelleForm.value.libelle as string
    }
    return this._categorieService.searchCategories(this.libelle).subscribe(
      (value: ArticleInterface) => {
        console.log(value);

        console.log(value.code);
        if (value.code == 504) {
          console.log("error 504");
          this.btnAjouter = true;
          this.condition = false;
        } else {
          this.btnAjouter = false;
          this.condition = true;
          console.log("code 200");
        }
      }, error => {
        console.log(error.error);

      }
    )
  }




  onKey(value: string) {
    if (value.length >= 3) {
      this.search();
    } else {
      this.condition = false;
    }
    return value.length < 3 ? this.condition1 = true : this.condition1 = false;
  }
  onChangeCheckBox(e: Event) {
    if ((e.target as HTMLInputElement).checked == true) {
      this.ad = false;

      //  this.selectH = false;
      if (this.ids.length > 0) {
        this.btnSupprimer = true;
      }
      this.clikable = true
      this.oky = true;
      console.log(this.oky);
      this.ad = false;  // activateBtn(event: any) {
      //   return (event.target.player.value);
      // }
      this.canette = false;

    }

    else {
      this.ad = true;
      this.btnSupprimer = false;
      this.clikable = false
      this.oky = false;
      console.log(this.oky);
      this.canette = true;
    }


  }

  onBlur() {
    this.condition1 = false;
  }
  onChangeCheckBox2(e: Event) {
    if ((e.target as HTMLInputElement).checked == true) {
      //  console.log(e.target.id);
      console.log(this.ids);
    }
    else {
      console.log("decoché");
    }
  }
  pushIds(e: Event) {
    console.log(this.ad);
    if ((e.target as HTMLInputElement).checked == true) {
      this.ids.push(+(e.target as HTMLInputElement).id);
    } else if ((e.target as HTMLInputElement).checked == false) {
      this.ids = this.ids.filter((id) => id !== +(e.target as HTMLInputElement).id);
      this.selectH = false;
    }
    console.log(this.ids);
    if (this.ids.length > 0 && this.ad == false) {
      this.btnSupprimer = true;
    }
    else {
      this.btnSupprimer = false;
    }
    console.log(this.ad);
    console.log(this.ids);
    if (this.ids.length == 3) {
      this.selectH = true;
    }

  }
  deleteCategories() {
    console.log("delete");
    let ids = this.ids;
    let ide = {
      "id": ids
    }
    let id = ide.id;
    console.log(id);
    return this._categorieService.deleteCategories(ide).subscribe(
      value => {
        console.log(value);
        this.getCategories();
        this.supp = true;
        setTimeout(() => {
          this.supp = false;
        }, 5000);
      }, error => {
        console.log(error);
      }
    );
  }

  getValue(libelle: string, id: number) {
    console.log(libelle);
    this.libelleForm.get('libelle')!.setValue(libelle);
    this.idEdit = id;
    console.log(this.idEdit);
  }


  edit() {
    this.libelle = {
      "libelle": this.libelleForm.value.libelle as string
    }
    return this._categorieService.updateCatégorie(this.libelle, this.idEdit).subscribe(
      data => {
        console.log(data);
        this.modifie = true
        this.libelleForm.reset();
        setTimeout(() => {
          this.modifie = false;
        }, 5000);
        this.btnAjouter = false;
        this.getCategories();
      }, error => {
        console.log(error);
      }
    )
  }



  selectAll(e: Event) {
    const targetInputElement = e.target as HTMLInputElement;

    if (targetInputElement.checked) {
      this.categories.forEach(c => c.checked = this.selectH);
      this.categories.forEach(c => {
        if (!this.ids.includes(c.id as number)) {
          this.ids.push(c.id as number);
        }
      });
    } else {
      this.categories.forEach(c => c.checked = false);
      this.categories.forEach(c => this.ids = this.ids.filter(id => id !== c.id));
    }

    console.log(this.ids);
  }


  ok() {
    if (this.oky == false) {
      this.addCategorie();
    } else if (this.oky == true) {
      this.edit();
    }
  }
}
