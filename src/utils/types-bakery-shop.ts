

export enum Paths {
    HOME = '/',
    ACCOUNT = 'account',
    ORDERS = 'orders',
    CUSTOMERS = 'customers',
    PRODUCTS = 'products',
    CART = 'cart',
    BREAD = 'bread',
    DAIRY = 'dairy',
    ERROR = 'error',
    BACK = 'back',
    LOGIN = 'login',
    LOGOUT = 'logout',
    SIGNUP = 'signup',
}

export type RouteType = {
    path:Paths,
    title:string,
    role?:Roles,

}
export type LoginData = {
    email: string,
    password: string,
}
export enum Roles {
    ALL = 0,USER = 1, ADMIN = 2,NO_AUTH = 3
}

export type ProductType = {
    id?:string,
    title:string,
    category:string,
    unit:string,
    cost:number,
    img:string,
}
export type Category = {
    cat_name:string,
}

export type UserType = {
    id:string,
    email:string,
    first_name:string,
    last_name:string,
    created_date:string,
    phone?:string,
    address?:string,
    notes?:string,
    role:Roles,
}
export interface UpdateUserData {
    [key: string]: string | undefined;
}

export type ShopCartProdType = {
    cartProdId:string,
    count:number,
}
export type CartItemType = ShopCartProdType & {
    img: string;
    title: string;
    cost: number;
    unit: string;
};