import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {setProducts} from "./firebase/fireBaseDbService.ts";
import productsData from "./components/configurations/products-config.json";


const products = productsData.products.map((item) => ({
    title: item.name,
    cost: item.cost,
    unit: item.unit,
    img: item.name + ".jpg",
    category: item.name.split("-")[0],
}));

setProducts(products).then(() => {
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)})
