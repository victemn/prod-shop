import {collection, doc, getDoc, setDoc, deleteDoc, getCountFromServer, updateDoc} from "firebase/firestore";
import {db} from "../components/configurations/firebase-config.ts";
import {Category, ProductType} from "../utils/types-bakery-shop.ts";
import {getRandomNumber} from "../utils/tools.ts";
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";

const productCollection = collection(db, "products-collection");
const categoryCollection = collection(db, "category-collection");


export const addProduct = async (product: ProductType) => {
    product.id = getRandomNumber(10_000, 100_000).toString();
    const ref = doc(productCollection, product.id);
    await setDoc(ref, product);
};

export const addCategory = async (category: Category) => {
    const ref = doc(categoryCollection, category.cat_name);
    await setDoc(ref, category);
};

export const removeProduct = async (id: string): Promise<ProductType> => {
    const ref = doc(productCollection, id);
    const temp = await getDoc(ref);
    await deleteDoc(ref);
    return temp.data() as ProductType;
};

export const getProduct = async (id: string): Promise<ProductType> => {
    const ref = doc(productCollection, id);
    return (await getDoc(ref)).data() as ProductType;
};

export const isCategoryExists = async (name: string): Promise<boolean> => {
    const ref = doc(categoryCollection, name);
    return (await getDoc(ref)).exists() as boolean;
};

export const setProducts = async (products: ProductType[]): Promise<number> => {
    let count = (await getCountFromServer(productCollection)).data().count;

    if (count === 0) {
        const newProducts = products.map((item) => ({
            title: item.title,
            unit: item.unit,
            cost: item.cost,
            img: item.title + "jpg",
            category: item.title.split("-")[0],
        }));
        for (let i = 0; i < newProducts.length; i++) {
            const tempCat = await isCategoryExists(newProducts[i].category);
            if (!tempCat) {
                await addCategory({ cat_name: newProducts[i].category });
            }
            await addProduct(newProducts[i]);
            count++;
        }
    }

    return count;
};

export const removeCategory = async (name: string): Promise<boolean> => {
    const ref = doc(categoryCollection, name);
    const categoryExists = (await getDoc(ref)).exists();

    if (categoryExists) {
        await deleteDoc(ref);
        return true;
    }
    return false;
};

export const getProducts = (): Observable<ProductType[]> => {
    return collectionData(productCollection) as Observable<ProductType[]>;
};

export const updateProductField = async (id: string, updates: Partial<ProductType>) => {
    const productRef = doc(productCollection, id);
    await updateDoc(productRef, updates);
};
