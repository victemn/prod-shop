import React, { useEffect, useState } from 'react';
import { Paths, RouteType } from '../../utils/types-bakery-shop.ts';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logout from "../servicePages/Logout.tsx";
import { useAppSelector } from "../../app/hooks.ts";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

type Props = {
    items: RouteType[];
    activeNavItem: Paths;
    setActiveNavItem: (path: Paths) => void;
    themeMode: 'dark' | 'light';
    toggleTheme: () => void;
    sub?: boolean;
};

const NavigationDeskTop: React.FC<Props> = ({ items, setActiveNavItem, themeMode, toggleTheme }) => {
    const location = useLocation();
    const [value, setValue] = useState(0);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const isInProducts = location.pathname.startsWith(Paths.PRODUCTS);

    useEffect(() => {
        const activeIndex = items.findIndex((item) => item.path === location.pathname);
        if (activeIndex !== -1) {
            setValue(activeIndex);
        }
    }, [location.pathname, items]);

    const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
        if (newValue < 0 || newValue >= items.length) return;
        setValue(newValue);
        setActiveNavItem(items[newValue].path);
    };

    const updatedItems = isInProducts ? [
            { path: Paths.BREAD, title: 'Bread', role: 'ALL' },
            { path: Paths.DAIRY, title: 'Dairy', role: 'ALL' },
            { path: Paths.BACK, title: 'Back to Menu', role: 'ALL' },
        ] : items;

    return (
        <Box sx={{ mt: '100px' }}>
            <AppBar sx={{
                backgroundColor: themeMode === 'dark' ? '#121212' : 'lightblue',
                borderRadius: '5px',
                boxShadow: themeMode === 'dark' ? 'none' : '0px 3px 5px rgba(0, 0, 0, 0.2)'
            }}>
                <Tabs value={value} onChange={handleChange} indicatorColor="primary">
                    {updatedItems
                        .filter((item) => item.path !== Paths.ACCOUNT)
                        .map((item, index) => {
                            if (item.path === Paths.LOGOUT) {
                                return isAuthenticated ? (
                                    <Box key={index} sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Tab
                                            component={Link}
                                            to="/account"
                                            label="Account"
                                            onClick={() => setValue(7)}
                                        />
                                        <Logout />
                                    </Box>
                                ) : null;
                            }
                            return (
                                <Tab
                                    key={index}
                                    component={Link}
                                    to={item.path}
                                    label={item.title}/>);})}
                    <IconButton
                        onClick={toggleTheme}
                        color="default"
                        sx={{ width: '40px', height: '40px', marginTop: '4px' }}>
                        {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tabs>
            </AppBar>
            <Outlet />
        </Box>
    );
};

export default NavigationDeskTop;


