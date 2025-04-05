
import { addDoc, collection } from "firebase/firestore";
import { db } from "../components/configurations/firebase-config.ts";

export type AdminAction = {
    timestamp: number;
    adminId: string;
    adminName: string;
    actionType: any;
    field?: string;
    oldValue?: string | number | boolean | null;
    newValue?: string | number | boolean | null;
    productId?: string;
};


const logRef = collection(db, "admin-logs");

export const logAdminAction = async (log: AdminAction) => {
    try {
        await addDoc(logRef, log);
    } catch (err) {
        console.error("Failed to log admin action", err);
    }
};
