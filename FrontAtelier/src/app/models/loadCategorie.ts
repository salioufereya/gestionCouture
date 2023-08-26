export interface Root {
  code: number
  message: string
  data: Data
}

export interface Data {
  categorie: Categorie[]
  fournisseur: Fournisseur[]
  article: ArticleWithUrl
  articleAll: ArticleAll[]
}

export interface Categorie {
  id: number
  libelle: string
}

export interface Fournisseur {
  id: number
  libelle: string
}

export interface ArticleWithUrl {
  current_page: number
  data: Article[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Article {
  id: number
  libelle: string
  prix: number
  stock: number
  categorie_id?: number
  categorie1?: number
  REF: string
  photo: string
  categorie?: Categorie2
  fournisseurs?: Fournisseur2[]
}





export interface Categorie2 {
  id: number
  libelle: string
}

export interface Fournisseur2 {
  id: number
  libelle: string
  pivot?: Pivot
}

export interface Pivot {
  article_id: number
  fournisseur_id: number
}
export interface Link {
  url?: string
  label: string
  active: boolean
}

export interface ArticleAll {
  id: number
  libelle: string
  prix: number
  stock: number
  categorie_id?: number
 // categorie?: number
  REF: string
  photo: string
  categorie: Categorie2
  fournisseurs?: Fournisseur2[]
}





//addArticle


export interface Ids {
  id: number
}

export interface Resp {
  code: number
  message: string
  data: Article
}