import './App.css';
import './components/navigation/navigation.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Home from './home/Home.tsx';
import Customers from './components/Customers.tsx';
import Orders from './components/Orders.tsx';
import ShoppingCart from './components/ShoppingCart.tsx';
import Bread from './components/bread/Bread.tsx';
import Dairy from './components/Dairy.tsx';
import ErrorPage from './components/servicePages/ErrorPage.tsx';
import {Paths, Roles, RouteType} from './utils/types-bakery-shop.ts';
import {navItems, productsItems} from './components/configurations/nav-config.ts';
import NavigationDeskTop from './components/navigation/NavigationDeskTop.tsx';
import Login from './components/servicePages/Login.tsx';
import Logout from './components/servicePages/Logout.tsx';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {onAuthStateChanged} from 'firebase/auth'
import {login, logout, setRole} from "./features/authSlice.ts";
import {auth} from "./components/configurations/firebase-config.ts";
import {Account} from "./components/servicePages/Account.tsx";
import {setAllProducts} from "./features/productSlice.ts";
import {getProducts} from "./firebase/fireBaseDbService.ts";
import {RootState} from "./app/store.ts";
import {getUser} from "./firebase/fireBaseDbUsers.ts";


function App() {
    const location = useLocation();
    const [activeNavItem, setActiveNavItem] = useState<Paths>(Paths.HOME);
    const authUser = useAppSelector(state => state.auth.authUser);
    const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
    const dispatch = useAppDispatch();
    const role = useAppSelector((state: RootState) => state.auth.role);
    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    };

    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });

    useEffect(() => {
        setActiveNavItem(location.pathname as Paths);
    }, [location]);

    const predicate = (item: RouteType) => {
        if (!role) return item.role === Roles.NO_AUTH; // Гость
        const isAdmin = role === Roles.ADMIN;

        if (item.path === Paths.CART && isAdmin) {
            return false;
        }
        return (
            item.role === Roles.ALL ||
            item.role === Roles.USER ||
            (item.role === Roles.ADMIN && isAdmin)
        );
    };

    const getRoutes = (): RouteType[] => {
        return navItems.filter(item => predicate(item))
    }
    console.log("Auth user:", authUser);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("Firebase Auth detected user:", user.email);
                dispatch(login(user.email!));
                const userData = await getUser(user.uid);
                if (userData && userData.role) {
                    dispatch(setRole(userData.role));
                } else {
                    dispatch(setRole(Roles.USER));
                }
            } else {
                console.log("No user found, logging out.");
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    useEffect(() => {
        const subscription = getProducts();
        subscription.subscribe((products)=>{dispatch(setAllProducts(products));});
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
                <Route path={Paths.HOME} element={<NavigationDeskTop items={getRoutes()} activeNavItem={activeNavItem} setActiveNavItem={setActiveNavItem}
                                                                     themeMode={themeMode}
                                                                     toggleTheme={toggleTheme}/>}>
                    <Route index element={<Home/>}/>
                    <Route path={Paths.ACCOUNT} element={<Account/>}/>
                    <Route path={Paths.CUSTOMERS} element={<Customers/>}/>
                    <Route path={Paths.ORDERS} element={<Orders/>}/>
                    <Route path={Paths.CART} element={<ShoppingCart/>}/>
                    <Route path={Paths.PRODUCTS}
                           element={<NavigationDeskTop items={productsItems} sub={true} activeNavItem={activeNavItem}
                                                       setActiveNavItem={setActiveNavItem} themeMode={themeMode}
                                                       toggleTheme={toggleTheme}/>}>
                        <Route path={Paths.BREAD} element={<Bread/>}/>
                        <Route path={Paths.DAIRY} element={<Dairy/>}/>
                        <Route path={Paths.BACK} element={<Navigate to={Paths.HOME}/>}/>
                    </Route>
                    <Route path={Paths.LOGIN} element={<Login/>}/>
                    <Route path={Paths.LOGOUT} element={<Logout/>}/>
                </Route>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
