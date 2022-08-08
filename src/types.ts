export type Cart = Map<number, ProductInCart>;

export interface ProductLink {
  rel: string;
  href: string;
  type: string;
}

export interface Product {
  listID: number;
  prodId: number;
  displayOrder: number;
  quantity: number;
  productLink: ProductLink;
  caption: string;
  imageURL: string;
  price: number;
  currency: string;
  description: string;
  hasFullDescription: boolean;
  brand: string;
  productUrl: string;
  isAvailable: boolean;
  maxOrderQuantity: number;
  mediumImageURL: string;
}

export type ProductInCart = Product & { 
  quantity: number;
  totalCost: () => string;
};

export type ProductSorting = 'price' | 'caption' | 'brand';