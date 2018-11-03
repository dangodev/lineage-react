export interface LineageCollection extends ShopifyBuy.Collection {
  products: LineageProduct[];
}

export interface LineageProduct extends ShopifyBuy.Product {
  legacyID: string;
  handle: string;
  metafields: Metafield[];
  title: string;
}

export interface Metafield {
  key: string;
  value: string;
}

export interface ShopifyLegacyCart {
  items: LineageProduct[];
}

export interface ShopifyLegacyLineItem {
  customAttributes: Metafield[];
  handle: string;
  quantity: number;
  title: string;
  variant: ShopifyBuy.ProductVariant;
}
