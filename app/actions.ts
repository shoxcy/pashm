'use server';

import { createCart, addToCart, getCart, Cart } from '@/lib/shopify';
import { cookies } from 'next/headers';

export async function getCartId(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get('cartId')?.value;
}

export async function getCartAction(): Promise<Cart | undefined> {
    const cartId = await getCartId();
    if (!cartId) return undefined;
    return await getCart(cartId);
}

export async function createCartAction(): Promise<Cart | undefined> {
    const cart = await createCart();

    if (cart?.id) {
        (await cookies()).set('cartId', cart.id);
    }

    return cart;
}

export async function addToCartAction(lines: { merchandiseId: string; quantity: number }[]): Promise<Cart | undefined> {
    const cookieStore = await cookies();
    let cartId = cookieStore.get('cartId')?.value;

    let cart: Cart | undefined;

    if (cartId) {
        cart = await addToCart(cartId, lines);
    } else {
        // If no cart, create one directly with lines
        cart = await createCart(lines);
        if (cart?.id) {
            (await cookies()).set('cartId', cart.id);
        }
    }

    return cart;
}
