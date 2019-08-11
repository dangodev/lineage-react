interface CustomAttribute {
  key: string;
  value: string;
}

/**
 * These are just flat-out wrong from @types/shopify-buy
 */
declare namespace ShopifyBuy {
  interface AttributeInput {
    customAttributes?: CustomAttribute[]; // this is in their docs and should be there
  }

  interface LineItem {
    customAttributes: CustomAttribute[]; // missing from @types/shopify-buy
    handle: string;
    images: { src: string }[];
    tags: CustomAttribute[];
    variant: ProductVariant;
  }

  // new
  interface CollectionWithProducts extends ShopifyBuy.Collection {
    products: Product[];
  }

  interface Product {
    descriptionHtml: string; // missing from @types/shopify-buy
    handle: string; // missing from @types/shopify-buy
    productType: string; // missing from @types/shopify-buy
    tags: CustomAttribute[];
  }

  interface ProductVariant {
    selectedOptions: { name: string; value: string }[];
  }
}

/**
 * Types for data coming straight from the Liquid templates (we need for ReCharge)
 */
declare namespace ShopifyLegacy {
  interface Cart {
    lineItems: LineItem[];
    lineItemCount: number;
  }

  interface CartUpdate {
    [id: string]: number;
  }

  interface CustomAttribute {
    key: string;
    value: string;
  }

  interface LineItem {
    customAttributes: CustomAttribute[];
    handle: string;
    id: string;
    quantity: number;
    title: string;
    variant: { title: string };
  }

  interface Metafields {
    [key: string]: string;
  }
}

/**
 * These aren’t “wrong“ like the ShopifyBuy overrides are; they’re just custom types for places where we need to manipulate data
 */
declare namespace ShopifyCustom {
  interface CollectionWithProducts extends ShopifyBuy.CollectionWithProducts {
    products: Product[];
  }
  interface LineItem extends ShopifyBuy.LineItem {
    metafields: { c_f?: { [key: string]: string } };
    productType: string;
  }

  interface Product extends ShopifyBuy.Product {
    legacyID: string;
    metafields: {
      c_f: { [key: string]: string };
      subscriptions: { [key: string]: string };
      [key: string]: { [key: string]: string };
    };
  }

  interface ProductMetadata {
    id: string;
    handle: string;
    title: string;
    variants: { id: string; title: string }[];
    metafields: {
      c_f: { [key: string]: string };
      subscriptions: {
        discount_percentage: string;
        discount_product_id: string;
        has_subscription: string;
        is_subscription_only: string;
        shipping_interval_frequency: string;
        shipping_interval_unit_type: string;
        subscription_id: string;
      };
    };
  }
}
