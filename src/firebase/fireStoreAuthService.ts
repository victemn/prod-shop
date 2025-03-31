import {
    signOut,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider
} from 'firebase/auth'
import {LoginData} from "../utils/types-bakery-shop.ts";
import {auth} from "../components/configurations/firebase-config.ts";


const loginWithEmail = async (data: LoginData) => {
    const result = await signInWithEmailAndPassword(auth, data.email, data.password);
    console.log("Firebase вернул email:", result.user.email);
    return result.user.email;
}

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user.email;
}

export const loginFirebase = async (data: LoginData) => {
    console.log("Logging in with data:", data);
    try {
        if (data.email === "GOOGLE") {
            const email = await loginWithGoogle();
            console.log("Google login successful, email:", email);
            return email;
        } else {
            const email = await loginWithEmail(data);
            console.log("Email login successful, email:", email);
            return email;
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
export const signoutFirebase = async () => {
    await signOut(auth);
}
export const signUpFirebase = async (data: LoginData) => {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    return result.user;
};