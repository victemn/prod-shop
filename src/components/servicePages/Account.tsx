
import { Box, Button, TextField, Typography, Alert, CircularProgress, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../firebase/fireBaseDbUsers.ts";
import { UpdateUserData } from "../../utils/types-bakery-shop.ts";
import { auth } from "../configurations/firebase-config.ts";
import EditIcon from "@mui/icons-material/Edit";

export const Account: React.FC = () => {
    const [userData, setUserData] = useState<UpdateUserData | undefined>(undefined);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [editableField, setEditableField] = useState<string | null>(null);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (!userId) {
            setErrorMessage("You must be logged in to view this page.");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const user = await getUser(userId);
                if (user) {
                    setUserData(user);
                    setPhone(user.phone || "");
                    setAddress(user.address || "");
                    setNotes(user.notes || "");
                } else {
                    setErrorMessage("User not found.");
                }
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : "Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleSave = async () => {
        if (!userData || !userId) return;

        const updateData: UpdateUserData = { phone, address, notes };
        try {
            await updateUser(userId, updateData);
            setSuccessMessage("Your data updated successfully.");
            setErrorMessage("");
            setEditableField(null);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Error updating user data.");
            setSuccessMessage("");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!userId) {
        return <Alert severity="error">Please login to view this page.</Alert>;
    }

    return (
        <Box sx={{width:'1100px'}}>
            <Typography variant="h4" sx={{width: "50vw", display: "flex", justifyContent: "center"}}>Hello, {userData?.first_name}!</Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <Box sx={{ marginTop: "20px", width:'70%',marginLeft:'20%'}} >
                {[{ label: "Phone", value: phone, setValue: setPhone, field: "phone"},
                    { label: "Address", value: address, setValue: setAddress, field: "address" },
                    { label: "Notes", value: notes, setValue: setNotes, field: "notes" }].map(({ label, value, setValue, field }) => (
                    <Box key={field}  sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                        <TextField
                            label={label}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            fullWidth
                            disabled={editableField !== field}
                        />
                        <IconButton  onClick={() => setEditableField(editableField === field ? null : field)}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
            <Button sx={{marginLeft:'30rem',width: "10vw", display: "flex", justifyContent: "center"}} onClick={handleSave} disabled={editableField === null} variant="contained">Save</Button>
        </Box>
    );
};
