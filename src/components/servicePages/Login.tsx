import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { useNavigate} from "react-router-dom";
import {LoginData} from "../../utils/types-bakery-shop.ts";
import {login} from "../../features/authSlice.ts";

import {loginFirebase} from "../../firebase/fireStoreAuthService.ts";
import {SignInCard} from "../templates/SignInCard.tsx";
import {useEffect} from "react";
// import {store} from "../../app/store.ts";


const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthenticated= useAppSelector((state)=>state.auth.isAuthenticated);

    const submitFnFirebase = async (loginData: LoginData) => {
        try {
            const email = await loginFirebase(loginData);
            
            dispatch(login(email as string));


            navigate('/');
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log("Error during login:", e.message);
            } else {
                console.log("Unknown error during login");
            }
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <SignInCard submitFn={submitFnFirebase}/>
    );
};

export default Login;