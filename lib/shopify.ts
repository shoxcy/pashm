
const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, "")
    : "";
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const apiVersion = "2024-01";

// Check if Shopify is properly configured
const isShopifyConfigured = Boolean(domain && storefrontAccessToken);

export type Maybe<T> = T | null;

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type Edge<T> = {
    node: T;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type SEO = {
    title: string;
    description: string;
};

export type Product = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
};

export type Collection = {
    id: string;
    handle: string;
    title: string;
    description: string;
    seo: SEO;
    updatedAt: string;
    products: Connection<Product>;
};

export type CartLine = {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        price: Money;
        product: Product;
    };
};

export type Cart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    lines: Connection<CartLine>;
    cost: {
        subtotalAmount: Money;
        totalAmount: Money;
        totalTaxAmount: Money;
        totalDutyAmount: Money;
    };
};

export type ShopifyResponse<T> = {
    data: T;
    errors?: unknown[];
};

export async function shopifyFetch<T>({
    cache = "no-store",
    headers,
    query,
    tags,
    variables,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: Record<string, unknown>;
}): Promise<{ status: number; body: ShopifyResponse<T> } | never> {
    try {
        const url = `https://${domain}/api/${apiVersion}/graphql.json`;
        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
            cache,
            ...(tags && { next: { tags } }),
        });

        const body = await result.json();

        if (body.errors) {
            console.error("Shopify API Errors:", body.errors);
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (e) {
        console.error("Shopify Fetch Error:", {
            url: `https://${domain}/api/${apiVersion}/graphql.json`,
            domain,
            cause: e
        });
        if (e instanceof Error) {
            throw e;
        } else {
            throw {
                message: "An unknown error occurred during the Shopify request.",
                cause: e,
            };
        }
    }
}

const PRODUCTS_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    seo {
      title
      description
    }
    tags
    updatedAt
  }
`;

const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${PRODUCTS_FRAGMENT}
`;

const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCTS_FRAGMENT}
`;

const getCollectionQuery = /* GraphQL */ `
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        title
        description
      }
      updatedAt
      products(first: 100, sortKey: CREATED, reverse: true) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCTS_FRAGMENT}
`;

const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
           subtotalAmount {
            amount
            currencyCode
           }
           totalTaxAmount {
            amount
            currencyCode
           }
           totalDutyAmount {
            amount
            currencyCode
           }
        }
    }
  }
`;

const createCartMutation = /* GraphQL */ `
  mutation cartCreate($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
           subtotalAmount {
            amount
            currencyCode
           }
           totalTaxAmount {
            amount
            currencyCode
           }
           totalDutyAmount {
            amount
            currencyCode
           }
        }
      }
    }
  }
`;

const addToCartMutation = /* GraphQL */ `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
           edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                   product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
        cost {
            totalAmount {
                amount
                currencyCode
            }
            subtotalAmount {
                amount
                currencyCode
            }
            totalTaxAmount {
                amount
                currencyCode
            }
            totalDutyAmount {
                amount
                currencyCode
            }
        }
      }
    }
  }
`;

export async function getProducts({
    query,
    reverse,
    sortKey,
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
} = {}): Promise<Product[]> {
    if (!isShopifyConfigured) {
        console.warn("Shopify is not configured. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env");
        return [];
    }

    try {
        const variables: Record<string, unknown> = {
            reverse,
            query,
        };

        if (sortKey) {
            variables.sortKey = sortKey;
        }

        const res = await shopifyFetch<{ products: Connection<Product> }>({
            query: getProductsQuery,
            variables,
        });

        return res.body.data.products.edges.map((edge) => edge.node);
    } catch (error) {
        console.error("Failed to fetch products from Shopify:", error);
        return [];
    }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
    if (!isShopifyConfigured) {
        console.warn("Shopify is not configured. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env");
        return undefined;
    }

    try {
        const res = await shopifyFetch<{ product: Maybe<Product> }>({
            query: getProductQuery,
            variables: {
                handle,
            },
        });

        return res.body.data.product || undefined;
    } catch (error) {
        console.error(`Failed to fetch product "${handle}" from Shopify:`, error);
        return undefined;
    }
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
    if (!isShopifyConfigured) {
        console.warn("Shopify is not configured. Please set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env");
        return undefined;
    }

    try {
        const res = await shopifyFetch<{ collection: Maybe<Collection> }>({
            query: getCollectionQuery,
            variables: {
                handle,
            },
        });

        return res.body.data.collection || undefined;
    } catch (error) {
        console.error(`Failed to fetch collection "${handle}" from Shopify:`, error);
        return undefined;
    }
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
    if (!isShopifyConfigured) {
        console.warn("Shopify is not configured. Cart functionality is disabled.");
        return undefined;
    }

    try {
        const res = await shopifyFetch<{ cart: Maybe<Cart> }>({
            query: getCartQuery,
            variables: { cartId },
            cache: "no-store",
        });
        return res.body.data.cart || undefined;
    } catch (error) {
        console.error("Failed to fetch cart from Shopify:", error);
        return undefined;
    }
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<Cart | undefined> {
    if (!isShopifyConfigured) {
        console.warn("Shopify is not configured. Cart functionality is disabled.");
        return undefined;
    }

    try {
        const res = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
            query: createCartMutation,
            variables: {
                lineItems: lines,
            },
            cache: "no-store",
        });

        return res.body.data.cartCreate?.cart;
    } catch (error) {
        console.error("Failed to create cart in Shopify:", error);
        return undefined;
    }
}

export async function addToCart(
    cartId: string,
    lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | undefined> {
    if (!isShopifyConfigured) {
        console.warn("Shopify is not configured. Cart functionality is disabled.");
        return undefined;
    }

    try {
        const res = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
            query: addToCartMutation,
            variables: {
                cartId,
                lines,
            },
            cache: "no-store",
        });

        return res.body.data.cartLinesAdd?.cart;
    } catch (error) {
        console.error("Failed to add items to cart in Shopify:", error);
        return undefined;
    }
}
