export interface FetchArticle {
    code: number
    message: string
    data: Data
}

export interface Data {
    current_page: number
    data: Daum[]
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

export interface Daum {
    id: number
    libelle: string
    prix: number 
    stock: number
    categorie_id: number
    REF: string
    photo: string
}

export interface Link {
    url?: string
    label: string
    active: boolean
}

export interface SendArticle {
    libelle: string
    prix: number
    stock: number
    categorie: string
    REF: string
    photo: string
    fournisseur: Array<number | null>

}