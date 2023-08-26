export interface Vente<T> {
    code: number
    message: string
    data: T[]
  }
  
  export interface ArticleVente {
    id?: number
    promo: number
    ref: string
    cout_fabrication: number
    prix_vente: number
    categorie_id: number
    photo: string
    stock: number
    articleConfection: ArticleConfection[]
  }
  
  export interface ArticleConfection {
    id?: number
    libelle: string
    stock: number
  }