import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { categorieInterface } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/article.service';
import { SendArticle } from 'src/app/models/articles';
import { Article, Categorie, Fournisseur } from 'src/app/models/loadCategorie';
import { FournisseurService } from 'src/app/services/fournisseur.service';
import { every } from 'rxjs';
@Component({
  selector: 'app-forme',
  templateUrl: './forme.component.html',
  styleUrls: ['./forme.component.css']
})
export class FormeComponent implements OnChanges {


  @Input() categories: Array<Categorie> = [];


  @Input() articles: Array<Article> = [];


  @Input() getFourni: () => void = () => { };


  // @Output() fournisseur = new EventEmitter<string>();



  @Input() fournisseurFromParent: Array<Fournisseur> = [];



  fournisseurToChoice: any;

  @Output() formDataEvent = new EventEmitter<any>();

  @Input() add: () => void = () => { };


  @Output() DataForm: SendArticle = <SendArticle>{}

  @Input() DataToEdit: Array<Article> = [];

  @Input() parentMethod!: Function;



  @Output() btnValue = new EventEmitter<string>();

  public fourniNotChoice: boolean = false;

  public Envoyer = "Envoyer";
  public Edit = "Edit";

  bool: boolean = true;
  reference: string = "REF";
  selectedCategorie: any;
  articleExisteDeja: boolean = false;




  parDefault: string = "https://images2.minutemediacdn.com/image/upload/c_crop,w_1080,h_607,x_0,y_29/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/voltaxMediaLibrary/mmsport/90min_fr_international_web/01h2xeffn7yx4azff47s.jpg"
  libelleFalse: boolean = false;
  constructor(private fb: FormBuilder, private articleService: ArticleService, private fournisseurService: FournisseurService) { }


  forme: FormGroup = this.fb.group({
    libelle: ["", [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z\s]+$/)]],
    prix: ["", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    stock: ["", [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    categorie_id: ["", [Validators.required]],
    photo: [this.parDefault, []],
    ref: ["REF", [Validators.required]],
    fournisseurChoisis: [[], []],
  });
  get libelle() { return this.forme.get('libelle'); }
  get prix() { return this.forme.get('prix'); }
  get stock() { return this.forme.get('stock'); }
  get ref() { return this.forme.get('ref'); }
  get photo() { return this.forme.get('photo'); }
  get categorie_id() { return this.forme.get('categorie_id'); }
  btnValu(value: Event) {
    let valu = value.target as HTMLInputElement;
    this.btnValue.emit(valu.value);
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if ("DataToEdit" in changes) {
      this.fournisseurDisplay = [];
      console.log(changes['DataToEdit'].currentValue);
      this.forme.get('libelle')?.setValue(changes['DataToEdit'].currentValue[0].libelle);
      this.forme.patchValue({ prix: changes['DataToEdit'].currentValue[0].prix });
      this.forme.patchValue({ stock: changes['DataToEdit'].currentValue[0].stock });
      this.forme.patchValue({ ref: changes['DataToEdit'].currentValue[0].REF });
      this.forme.patchValue({ categorie_id: changes['DataToEdit'].currentValue[0].categorie_id })
      if (changes['DataToEdit'].currentValue[0]) {
        this.parDefault = "";
        this.forme.get('photo')?.setValue(changes['DataToEdit'].currentValue[0].photo);

      }
      this.bool = false;
      console.log(this.fournisseurChoisis);
      this.fournisseurDisplay = changes['DataToEdit'].currentValue[0].fournisseurs;
      this.fournisseurChoisis = this.fournisseurDisplay.map(fournisseur => fournisseur.id);
    }

  }
  getFournie(a: Event) {
    let e = a.target as HTMLButtonElement;
    if (e.value.length > 1) {
      if (e.value.length > 0) {
        this.fournisseurToChoice = this.fournisseurFromParent.filter(f => f.libelle.toLowerCase().includes(e.value.toLowerCase()))
      }
      else {
        this.fournisseurToChoice = this.fournisseurToChoice
      }
    } else {
      this.fournisseurToChoice = [];
    }
  }
  submitForm() {
    let formeData: FormData = new FormData();
    const values = this.fournisseurChoisis.map((control: any) => control.toString());
    const joinedString = values.join(', ');
    console.log(joinedString);
    formeData.append('libelle', this.forme.value.libelle);
    formeData.append('prix', this.forme.value.prix);
    formeData.append('stock', this.forme.value.stock);
    formeData.append('ref', this.forme.value.ref);
    formeData.append('categorie_id', this.forme.value.categorie_id);
    formeData.append('photo', this.forme.get('photo')?.value);
    formeData.append('fournisseurChoisis', joinedString);
    this.formDataEvent.emit(formeData);
  }
  fournisseurChoisis: any = [];
  fournisseurDisplay: Array<Fournisseur> = [];

  push(e: Event) {
    let event = e.target as HTMLInputElement;
    const id = event.getAttribute('value');
    const libelle = event.getAttribute('id');
    this.fournisseurChoisis.push(+event.value)
    this.fournisseurToChoice = this.fournisseurToChoice.filter((x: { id: number; }) => x.id !== +event.value)
    this.fournisseurFromParent = this.fournisseurFromParent.filter(x => x.id !== +event.value)
    this.fournisseurDisplay.push({ id: +id!, libelle: libelle! });
    console.log(this.fournisseurChoisis.value);
    console.log(this.fournisseurChoisis);

  }

  depush(e: Event) {
    let ev = e.target as HTMLButtonElement
    console.log(ev.value);
    const id = ev.getAttribute('value');
    const libelle = ev.getAttribute('id');
    if (this.fournisseurChoisis.includes(+ev.value)) {
      const index = this.fournisseurChoisis.indexOf(+ev.value);
      this.fournisseurChoisis.splice(index, 1);
    }
    this.fournisseurDisplay = this.fournisseurDisplay.filter(x => x.id !== +ev.value)
    this.fournisseurToChoice.push({ id: +id!, libelle: libelle! });
    this.fournisseurFromParent.push({ id: +id!, libelle: libelle! })
    console.log(this.fournisseurChoisis);

  }
  public file!: File;
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      if (this.file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          this.forme.get('photo')?.setValue(imageUrl);

        };
        reader.readAsDataURL(this.file);
      }
    }
  }
  getFirst3libelle(e: Event) {
    this.reference = this.reference.substring(0, 2);
    if (this.reference.length < 6) {
      let event = e.target as HTMLInputElement;
      let a = event.value.substr(0, 3);
      this.reference = this.reference + "-" + a.toUpperCase();
      this.forme.patchValue({ ref: this.reference })
    }
    this.search(e)

  }

  search(evens: Event) {
    let even = evens.target as HTMLInputElement;
    const estPresent = this.articles.some(article =>
      article.libelle.toLowerCase() === even.value.toLowerCase()
    );
    if (estPresent) {
      this.articleExisteDeja = true;
      setTimeout(() => {
        this.articleExisteDeja = false;
      }, 5000);
      even.value = "";
    }
  }


  searchAly(e: Event) {
    let et = e.target as HTMLInputElement;
    let libelle = {
      "libelle": et.value
    }
    if (et.value.length > 1) {
      this.fournisseurService.search(libelle).subscribe(
        value => {
          this.fournisseurToChoice = value.data;
        }
      )
    }
  }
  onCategorie(e: Event) {
    let event = e.target as HTMLInputElement;
    this.reference = this.reference.substring(0, 6);
    if (this.reference.length > 3) {
      let lib = this.categories.filter(objet => objet['id'] === +event.value);
      this.reference = this.reference + "-" + lib[0].libelle.toLocaleUpperCase();
      this.forme.patchValue({ ref: this.reference })
      let id = this.articles.find(objet => objet['categorie_id'] === +event.value);
      //  const total = this.articles.filter(objet => objet['categorie_id'] === id?.id);
      let total =
        console.log((id!.id) + 1);

      this.reference = this.reference + "-" + (id!.id + 1);
      this.forme.patchValue({ ref: this.reference })
    } else {
      this.libelleFalse = true
    }
    setTimeout(() => {
      this.libelleFalse = false
    }, 5000);
    console.log(this.fournisseurChoisis);

  }

  declancher(e: HTMLButtonElement) {
    e.click();
  }


  resetForm() {
    this.forme.reset();
  }

  // compare(option: any, option1: any) {
  //   return option.id === option1.id
  // }

  vide(e: Event) {
    let a = e.target as HTMLButtonElement;
    a.value = "";
  }
}



