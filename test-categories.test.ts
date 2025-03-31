import { Category } from "./src/utils/types-bakery-shop";
import { addCategory, isCategoryExists, removeCategory } from "./src/firebase/fireBaseDbService";


describe("exist", () => {
    test('All categories exist', async () => {
        const categories = ["bread", "biscuits", "cake", "croissants", "pizza", "pretzels", "sweets", "tart"];
        const results = await Promise.all(categories.map(cat => isCategoryExists(cat)));
        expect(results.every(Boolean)).toBe(true);
    });
})


describe("adding", () => {
    test('Add category', async () => {
        const testCategory: Category = {cat_name: 'TestCategory'};
        await addCategory(testCategory);
        const exists = await isCategoryExists(testCategory.cat_name);
        expect(exists).toBeTruthy();
    });
})


describe("remove", () => {
    test('Remove category', async () => {
        const testCategory: Category = {cat_name: 'TestCategory'};
        await removeCategory(testCategory.cat_name);
        const exists = await isCategoryExists(testCategory.cat_name);
        expect(exists).toBeFalsy();
    });
})


