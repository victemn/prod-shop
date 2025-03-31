import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks.ts";

import { useState } from "react";
import {addProductToCart} from "../firebase/freBaseCartService.ts";
import {checkImgUri} from "../utils/tools.ts";

const BreadProductUser = () => {
    const { products } = useAppSelector(state => state.currProduct);
    const { authUser } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const [productCounts, setProductCounts] = useState<{ [key: string]: number }>({});

    const handleAddToCart = async (itemId: string) => {
        if (!authUser) {
            navigate('/login');
            return;
        }

        const count = productCounts[itemId] || 0;
        const product = products.find(p => p.id === itemId);
        if (!product) return;

        for (let i = 0; i < count; i++) {
            await addProductToCart(`${authUser}_collection`, {
                cartProdId: itemId,
                count: count,
                img: product.img,
                title: product.title,
                cost: Number(product.cost),
                unit: String(product.unit),
            });
        }
        setProductCounts(prev => ({ ...prev, [itemId]: 0 }));
    };

    const handleIncrease = (itemId: string) => {
        setProductCounts(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const handleDecrease = (itemId: string) => {
        setProductCounts(prev => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={{marginLeft:'10rem'}}>
            {products.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={3}>
                    <Card sx={{
                        width: '17rem',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                    }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={checkImgUri(item.img)}
                            sx={{ objectFit: 'contain' }}
                        />
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body2">Units: {item.unit}</Typography>
                            <Typography variant="body1">Price: ${item.cost}</Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', width: '100%' }}>
                            <Button variant="outlined" onClick={() => handleIncrease(item.id!)}>+</Button>
                            <Box sx={{ minWidth: 20, textAlign: 'center' }}>{productCounts[item.id!] || 0}</Box>
                            <Button variant="outlined" onClick={() => handleDecrease(item.id!)}>-</Button>
                        </CardActions>
                        <Button
                            variant="outlined"
                            sx={{ marginBottom: 1, width: '90%' }}
                            disabled={!productCounts[item.id!]}
                            onClick={() => handleAddToCart(item.id!)}>
                            Add to cart
                        </Button>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default BreadProductUser;

