// import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
// import {DataGrid, GridColDef, GridActionsCellItem, GridValidRowModel} from "@mui/x-data-grid";
// import {Avatar, Box, Typography, TextField, Snackbar, Alert, Button} from "@mui/material";
// import {TrashBinIcon} from "./templates/CustomIcons.tsx";
// import {
//     addProduct,
//     getProducts,
//     removeProduct,
//     setProducts,
//     updateProductField,
// } from "../firebase/fireBaseDbService.ts";
// import {useEffect, useState} from "react";
// import productConfig from '../components/configurations/products-config.json';
// import {checkImgUri} from "../utils/tools.ts";
// import AddProdForm from "../forms/AddProdForm.tsx";
// import {ProductType} from "../utils/types-bakery-shop.ts";
// import { setAllProducts as setProductsAction } from "..//features/productSlice.ts";
// import { Subscription } from "rxjs";
//
//
// const ProductAdmin = () => {
//     const {products} = useAppSelector(state => state.currProduct);
//     const [error, setError] = useState<string | null>(null);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//
//     const dispatch = useAppDispatch();
//
//     useEffect(() => {
//         const subscription: Subscription = getProducts().subscribe((products) => {
//             dispatch(setProductsAction(products));
//         });
//
//         return () => subscription.unsubscribe(); // отписываемся при размонтировании
//     }, []);
//
//
//     const handleDelete = async (id: string) => {
//         try {
//             await removeProduct(id);
//         } catch (error) {
//             setError("Failed to delete product. " + error);
//             setOpen(true);
//         }
//     };
//
//     const processRowUpdate = async (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
//         const updates: Partial<ProductType> = {};
//
//         const { minPrice, maxPrice } = productConfig.productConfig;
//         if (newRow.cost < minPrice || newRow.cost > maxPrice) {
//             setError(`Price must be between ${minPrice} and ${maxPrice}`);
//             setOpen(true);
//             return oldRow;
//         }
//
//         if (!newRow.category || !isNaN(Number(newRow.category))) {
//             setError("Category must be a valid string.");
//             setOpen(true);
//             return oldRow;
//         }
//
//         if (!newRow.unit || !isNaN(Number(newRow.unit))) {
//             setError("Unit must be a valid string.");
//             setOpen(true);
//             return oldRow;
//         }
//
//         if (!newRow.title || !isNaN(Number(newRow.title))) {
//             setError("Product name must be a valid string.");
//             setOpen(true);
//             return oldRow;
//         }
//
//         if (isNaN(newRow.cost)) {
//             setError("Cost must be a valid number.");
//             setOpen(true);
//             return oldRow;
//         }
//         if (newRow.cost !== oldRow.cost) updates.cost = newRow.cost;
//         if (newRow.category !== oldRow.category) updates.category = newRow.category;
//         if (newRow.unit !== oldRow.unit) updates.unit = newRow.unit;
//         if (newRow.title !== oldRow.title) updates.title = newRow.title;
//
//         if (Object.keys(updates).length > 0) {
//             try {
//                 await updateProductField(newRow.id, updates);
//                 const updatedProducts = products.map((product: ProductType) =>
//                     product.id === newRow.id ? { ...product, ...updates } : product
//                 );
//                await setProducts(updatedProducts);
//             } catch (error) {
//                 setError("Failed to update product: " + error);
//                 setOpen(true);
//                 return oldRow;
//             }
//         }
//
//         return newRow;
//     };
//
//     const columns: GridColDef[] = [
//         {field: 'id', headerName: 'ID', flex: 0.3},
//         {field: 'title', headerName: 'Product name', flex: 1,editable:true},
//         {field: 'category', headerName: 'Category', flex: 0.4,editable:true},
//         {field: 'unit', headerName: 'Unit', flex: 0.4,editable:true},
//         {
//             field: 'cost', headerName: 'Cost(NIS)', flex: 0.4, editable: true, renderCell: (params) => (
//                 <TextField
//                     type="number"
//                     defaultValue={params.value}/>)
//         },
//         {
//             field: 'img', headerName: 'Image', flex: 0.6, editable: true, renderCell: (params) => {
//                 const imagePath = checkImgUri(params.value);
//                 return (
//                     <Avatar
//                         sx={{width: "60px", height: "60px", margin: "0 auto"}}
//                         src={imagePath}
//                         alt={params.row.title}/>);
//             }
//         },
//         {
//             field: 'actions',
//             type: 'actions',
//             flex: 0.4,
//             getActions: ({id}) => [
//                 <GridActionsCellItem
//                     label="Delete"
//                     icon={<TrashBinIcon/>}
//                     onClick={() => handleDelete(id as string)}
//                     sx={(theme)=>({
//                         backgroundColor: theme.palette.mode === 'dark' ? '#eae1e1' : '#f9f9f9',
//                             color: theme.palette.mode === 'dark' ? '#fff' : '#000',
//                     })}
//                 />
//             ]
//         }
//     ];
//
//     function prodValidation(prod:ProductType) {
//         console.log(prod)
//         //TODO product validation
//         return ""
//
//     }
//     const renderEdit = () => (
//         <Box>
//             <AddProdForm submitFn={async (prod)=>{
//                 const res = prodValidation(prod);
//
//                 if (!res)
//                await addProduct(prod);
//                 setEditMode(false)
//                 return res;
//             }}/>
//
//         </Box>
//     );
//
//     const renderTab = () => (
//         <Box sx={{width: "100%", height: "70vh", margin: "0 auto" }}>
//             <Typography component="h2" variant="h4" gutterBottom align="center">
//                 Product Management
//             </Typography>
//
//             {error && (
//                 <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
//                     <Alert severity="error" variant="filled" sx={{width: '100%'}}>
//                         {error}
//                     </Alert>
//                 </Snackbar>
//             )}
//             <Button
//                 variant={"outlined"} color={"secondary"}
//                 onClick={() => setEditMode(true)}
//             >Add new product</Button>
//             <DataGrid
//                 sx={{
//                     '& .MuiDataGrid-root': {
//                         backgroundColor: 'background.default',
//                         color: 'text.primary',
//                     },
//                     '& .MuiDataGrid-columnHeaders': {
//                         backgroundColor: 'background.paper',
//                         color: 'text.primary',
//                     },
//                     '& .MuiDataGrid-cell': {
//                         borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//                     },
//                     '& .MuiDataGrid-virtualScroller': {
//                         backgroundColor: 'background.default',
//                     },
//                     '& .MuiDataGrid-footerContainer': {
//                         backgroundColor: 'background.paper',
//                     },
//                 }}
//                 columns={columns}
//                 rows={products}
//
//                 getRowHeight={() => "auto"}
//                 disableRowSelectionOnClick
//                 processRowUpdate={processRowUpdate}
//             />
//         </Box>
//     );
//
//     return (
//         <Box sx={{width: "90vw", height: "90vh", margin: "0 auto"}}>
//             {editMode ? renderEdit() : renderTab()}
//         </Box>
//     );
// };
//
// export default ProductAdmin;
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {DataGrid, GridColDef, GridActionsCellItem, GridValidRowModel, GridCellParams} from "@mui/x-data-grid";
import {Avatar, Box, Typography, TextField, Snackbar, Alert, Button} from "@mui/material";
import {TrashBinIcon} from "./templates/CustomIcons.tsx";
import {addProduct, getProducts, removeProduct, setProducts, updateProductField,} from "../firebase/fireBaseDbService.ts";
import {useEffect, useState} from "react";
import productConfig from '../components/configurations/products-config.json';
import {checkImgUri} from "../utils/tools.ts";
import AddProdForm from "../forms/AddProdForm.tsx";
import {ProductType} from "../utils/types-bakery-shop.ts";
import { setAllProducts as setProductsAction } from "../features/productSlice.ts";
import { Subscription } from "rxjs";
import { logAdminAction } from "../firebase/logAdminAction.ts";

const ProductAdmin = () => {
    const {products} = useAppSelector(state => state.currProduct);
    const {authUser, user} = useAppSelector(state => state.auth);
    const adminId = user?.uid || authUser || "mock-admin-id";
    const adminName = user?.displayName || "Mock Admin";

    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const subscription: Subscription = getProducts().subscribe((products) => {
            dispatch(setProductsAction(products));
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await removeProduct(id);
            await logAdminAction({
                timestamp: Date.now(),
                adminId,
                adminName,
                actionType: "delete",
                productId: id,
            });
        } catch (error) {
            setError("Failed to delete product. " + error);
            setOpen(true);
        }
    };

    const processRowUpdate = async (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
        const updates: Partial<ProductType> = {};
        const {minPrice, maxPrice} = productConfig.productConfig;

        if (newRow.cost < minPrice || newRow.cost > maxPrice) {
            setError(`Price must be between ${minPrice} and ${maxPrice}`);
            setOpen(true);
            return oldRow;
        }

        if (!newRow.category || !isNaN(Number(newRow.category))) {
            setError("Category must be a valid string.");
            setOpen(true);
            return oldRow;
        }

        if (!newRow.unit || !isNaN(Number(newRow.unit))) {
            setError("Unit must be a valid string.");
            setOpen(true);
            return oldRow;
        }

        if (!newRow.title || !isNaN(Number(newRow.title))) {
            setError("Product name must be a valid string.");
            setOpen(true);
            return oldRow;
        }

        if (isNaN(newRow.cost)) {
            setError("Cost must be a valid number.");
            setOpen(true);
            return oldRow;
        }

        if (newRow.cost !== oldRow.cost) updates.cost = newRow.cost;
        if (newRow.category !== oldRow.category) updates.category = newRow.category;
        if (newRow.unit !== oldRow.unit) updates.unit = newRow.unit;
        if (newRow.title !== oldRow.title) updates.title = newRow.title;

        if (Object.keys(updates).length > 0) {
            try {
                await updateProductField(newRow.id, updates);
                const updatedProducts = products.map((product: ProductType) =>
                    product.id === newRow.id ? {...product, ...updates} : product
                );
                await setProducts(updatedProducts);

                // логируем изменения
                Object.entries(updates).forEach(([field, value]) => {
                    logAdminAction({
                        timestamp: Date.now(),
                        adminId,
                        adminName,
                        actionType: "edit",
                        field,
                        oldValue: oldRow[field],
                        newValue: value,
                        productId: newRow.id,
                    });
                });
            } catch (error) {
                setError("Failed to update product: " + error);
                setOpen(true);
                return oldRow;
            }
        }

        return newRow;
    };

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0.3},
        {field: 'title', headerName: 'Product name', flex: 1, editable: true},
        {field: 'category', headerName: 'Category', flex: 0.4, editable: true},
        {field: 'unit', headerName: 'Unit', flex: 0.4, editable: true},
        {
            field: 'cost', headerName: 'Cost(NIS)', flex: 0.4, editable: true, renderCell: (params) => (
                <TextField
                    type="number"
                    defaultValue={params.value}/>
            )
        },
        {
            field: 'img', headerName: 'Image', flex: 0.6, editable: true, renderCell: (params) => {
                const imagePath = checkImgUri(params.value);
                return (
                    <Avatar
                        sx={{width: "60px", height: "60px", margin: "0 auto"}}
                        src={imagePath}
                        alt={params.row.title}/>
                );
            }
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 0.4,
            getActions: ({id}) => [
                <GridActionsCellItem
                    label="Delete"
                    icon={<TrashBinIcon/>}
                    onClick={() => handleDelete(id as string)}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.mode === 'dark' ? '#eae1e1' : '#f9f9f9',
                        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    })}
                />
            ]
        }
    ];

    const prodValidation = (prod: ProductType) => {
        console.log(prod);
        return "";
    };

    const renderEdit = () => (
        <Box>
            <AddProdForm submitFn={async (prod) => {
                const res = prodValidation(prod);
                if (!res) await addProduct(prod);
                setEditMode(false);
                return res;
            }}/>
        </Box>
    );

    const renderTab = () => (
        <Box sx={{width: "100%", height: "70vh", margin: "0 auto"}}>
            <Typography component="h2" variant="h4" gutterBottom align="center">
                Product Management
            </Typography>

            {error && (
                <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                    <Alert severity="error" variant="filled" sx={{width: '100%'}}>
                        {error}
                    </Alert>
                </Snackbar>
            )}

            <Button variant="outlined" color="secondary" onClick={() => setEditMode(true)}>
                Add new product
            </Button>

            <DataGrid
                sx={{
                    '& .MuiDataGrid-root': {
                        backgroundColor: 'background.default',
                        color: 'text.primary',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: 'background.default',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: 'background.paper',
                    },
                }}
                columns={columns}
                rows={products}
                getRowHeight={() => "auto"}
                disableRowSelectionOnClick
                processRowUpdate={processRowUpdate}
                onCellClick={(params: GridCellParams) => {
                    logAdminAction({
                        timestamp: Date.now(),
                        adminId,
                        adminName,
                        actionType: "cell_click" ,
                        field: params.field,
                        productId: params.row.id,
                    });
                }}
            />
        </Box>
    );

    return (
        <Box sx={{width: "90vw", height: "90vh", margin: "0 auto"}}>
            {editMode ? renderEdit() : renderTab()}
        </Box>
    );
}
export default ProductAdmin;
