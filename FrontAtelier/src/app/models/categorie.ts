export interface categorieInterface {
    id?: number;
    libelle: string;
    checked?: boolean;
}


export interface ids {
    id: Array<number>;
}



export interface ArticleInterface {
    code: number;
    message: string;
    data: data
}



export interface CateInterface {
    code: number;
    message: string;
    data: data
}

type data = {
    id: number;
    libelle: string;

}

export interface DataWithUrl {
    data: categorieInterface[];
    links: {
        first: string,
        last: string,
        next?: string,
        prev: string

    };
    meta: {
        "current_page": number,
        "from": number,
        "last_page": number,
        "total": number,
        "links":
        {
            "url": string,
            "label": string,
            "active": boolean
        }[],


    }
}


export interface Links {
    "url": string,
    "label": string,
    "active": boolean,
}



export interface addArticle {
    code: number
    message: string
    data: Article
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
export interface GetArticle {
    code: number
    message: string
    data: ArticleGet[]
}

export interface ArticleGet {
    id: number
    libelle: string
    prix: number
    stock: number
    categorie_id: number
    REF: string
    photo: string
    created_at: string
    updated_at: string
}



