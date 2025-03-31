import {collection,doc,getDoc,setDoc,updateDoc} from "firebase/firestore"
import {auth, db} from "../components/configurations/firebase-config.ts";
import {UpdateUserData, UserType} from "../utils/types-bakery-shop.ts";
import {setRole} from "../features/authSlice.ts";
import {AppDispatch} from "../app/store.ts";



const userCollection = collection(db,'users');

export const addUser = async (firstName:string,lastName:string) => {
    const user = auth.currentUser
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 100000)}`
    if(!user){
        return;
    }
    const data:UserType = {
        id: uniqueId,
        email:user.email!,
        first_name:firstName,
        last_name:lastName,
        created_date:new Date().toISOString(),
        role:0,
    }
    await setDoc(doc(userCollection,user.uid),data);
}
export const updateUser = async (userId: string, updateData: UpdateUserData) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updateData);
};

export const getUser = async (userId: string) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
};


export const fetchUserRole = async (uid: string, dispatch: AppDispatch) => {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log("User role from Firebase:", userData.role);
            dispatch(setRole(userData.role)); // Сохраняем роль в Redux
        } else {
            console.error("User not found in Firebase");
            dispatch(setRole(null));
        }
    } catch (error) {
        console.error("Error fetching user role:", error);
        dispatch(setRole(null));
    }
};

