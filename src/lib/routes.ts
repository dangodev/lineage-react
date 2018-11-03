export const CART_PATH = '/cart';
export const CHECKOUT_PATH = '/checkout';
export const COLLECTIONS_PATH = '/collections';
export const PAGES_PATH = '/pages';
export const PRODUCTS_PATH = '/products';

export const getCheckout = (domain: string) => `https://${domain}/${CHECKOUT_PATH}`;
export const getCollection = (handle: string) => `${COLLECTIONS_PATH}/${handle}`;
export const getPage = (handle: string) => `${PAGES_PATH}/${handle}`;
export const getProduct = (handle: string) => `${PRODUCTS_PATH}/${handle}`;

export const COLLECTION = {
  coffee: getCollection('coffee'),
  gear: getCollection('gear'),
};

export const PAGE = {
  about: getPage('about'),
  learn: getPage('learn'),
  wholesale: getPage('wholesale'),
};
