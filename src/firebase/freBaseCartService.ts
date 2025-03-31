import {CartItemType} from "../utils/types-bakery-shop.ts";
import {deleteDoc, doc, getDoc, setDoc, getDocs, collection, updateDoc} from "firebase/firestore";
import { db } from "../components/configurations/firebase-config.ts";


export const addProductToCart = async (collName: string, product: CartItemType) => {
    const ref = doc(db, collName, product.cartProdId);
    await setDoc(ref, {
        cartProdId: product.cartProdId,
        count: product.count,
        img: product.img,
        title: product.title,
        cost: product.cost,
        unit: product.unit,
    });
};

export const removeProductFromCart = async (collName: string, id: string) => {
    const ref = doc(db, collName, id);
    await deleteDoc(ref);
};

export const removeProductUnitFromCart = async (collName: string, id: string) => {
    const ref = doc(db, collName, id);
    const temp = await getDoc(ref);
    const prodData = temp.data();

    if (!prodData) return;

    const count = prodData.count - 1;

    if (count <= 0) {
        await removeProductFromCart(collName, id);
    } else {
        await updateDoc(ref, { count });
    }
};


export const getCartProducts = async (collName: string) => {
    try {
        const cartRef = collection(db, collName);
        const querySnapshot = await getDocs(cartRef);
        const cartItems: CartItemType[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data) {
                const cartItem: CartItemType = {
                    cartProdId: doc.id,
                    count: data.count,
                    img: data.img || 'default.jpg',
                    title: data.title || 'Unknown Product',
                    cost: data.cost || 0,
                    unit: data.unit || 1,
                };
                cartItems.push(cartItem);
            }
        });

        return cartItems;
    } catch (error) {
        console.error("Error fetching cart products:", error);
        return [];
    }
};
