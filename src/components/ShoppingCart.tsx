import {useEffect, useState} from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {
    getCartProducts,
    addProductToCart,
    removeProductUnitFromCart,
    removeProductFromCart
} from "../firebase/freBaseCartService";
import {CartItemType} from "../utils/types-bakery-shop.ts";
import {checkImgUri} from "../utils/tools.ts";

const ShoppingCart = () => {
    const {authUser} = useAppSelector(state => state.auth);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const totalItems = cartItems.reduce((sum, item) => sum + (item.count ?? 0), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.cost * (item.count ?? 0)), 0);

    useEffect(() => {
        if (authUser) {
            const fetchCart = async () => {
                try {
                    const cartData = await getCartProducts(`${authUser}_collection`);
                    setCartItems(cartData);
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                }
            };
            fetchCart();
        }
    }, [authUser]);

    const handleIncrease = async (itemId: string) => {
        if (authUser) {
            const item = cartItems.find(item => item.cartProdId === itemId);
            if (item) {
                const updatedItem = {...item, count: (item.count ?? 0) + 1};
                await addProductToCart(`${authUser}_collection`, updatedItem);
                const updatedCart = await getCartProducts(`${authUser}_collection`);
                setCartItems(updatedCart);
            }
        }
    };

    const handleCheckout = () => {
        alert("Proceeding to checkout!");
    };

    const handleDecrease = async (itemId: string) => {
        if (authUser) {
            await removeProductUnitFromCart(`${authUser}_collection`, itemId);
            const updatedCart = await getCartProducts(`${authUser}_collection`);
            setCartItems(updatedCart);
        }
    };

    const handleDelete = async (itemId: string) => {
        if (authUser) {
            await removeProductFromCart(`${authUser}_collection`, itemId);
            const updatedCart = await getCartProducts(`${authUser}_collection`);
            setCartItems(updatedCart);
        }
    };

    if (!authUser) {
        return <Typography>Please log in to view your cart.</Typography>;
    }

    if (cartItems.length === 0) {
        return <Typography sx={{width:'100vw',display:'flex',flexDirection:'row',justifyContent:'center'}}>Your cart is empty.</Typography>;
    }

    return (
        <Grid container spacing={2} justifyContent="center" marginLeft='5rem'>
            {cartItems.map((item) => (
                <Grid item key={item.cartProdId} xs={12} sm={8} md={8}>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: '1rem',
                        width: '45vw',
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 200,
                                height: 200,
                                objectFit: 'cover',
                                marginRight: '1rem',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                            image={checkImgUri(item.img)}
                        />
                        <Box sx={{flex: 1}}>
                            <CardContent sx={{padding: 0}}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2">Price: ${item.cost}</Typography>
                                <Typography variant="body1">Units: {item.unit}</Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent: 'center', marginTop: 'auto'}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '1rem'
                                }}>
                                    <Button variant="outlined"
                                            onClick={() => handleDecrease(item.cartProdId)}>-</Button>
                                    <Box sx={{
                                        minWidth: 40,
                                        textAlign: 'center',
                                        padding: '0 1rem'
                                    }}>{item.count ?? 0}</Box>
                                    <Button variant="outlined"
                                            onClick={() => handleIncrease(item.cartProdId)}>+</Button>
                                </Box>
                            </CardActions>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{marginTop: 1, width: '50%',marginLeft:12}}
                                onClick={() => handleDelete(item.cartProdId)}>
                                Remove
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            ))}
            <Box
                sx={(theme) => ({
                    marginTop: '2rem',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '600px',
                    marginX: 'auto',
                    backgroundColor: theme.palette.mode === 'dark' ? '#302e2e' : '#f9f9f9',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                })}
            >
                <Typography variant="h6">Total Items: {totalItems}</Typography>
                <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        marginTop: '1rem',
                        width: '100%',
                        fontSize: '1.2rem',
                        padding: '0.8rem',
                    }}
                    onClick={handleCheckout}
                >
                    Checkout
                </Button>
            </Box>
        </Grid>

    );
};

export default ShoppingCart;
