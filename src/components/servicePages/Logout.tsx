import {useState} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/authSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom';
import {signoutFirebase} from "../../firebase/fireStoreAuthService.ts";
import {Paths} from "../../utils/types-bakery-shop.ts";


const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickOpen = () => {
        console.log("Logout button clicked");
        setOpen(true);
    };

    const handleClose = () => {
        if (!loading) setOpen(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await signoutFirebase();
            dispatch(logout());
            navigate(Paths.HOME);
        } catch (e) {
            console.error(e);
            setError('failed to logout');
        } finally {
            setLoading(false);
            setOpen(false);
        }

    };

    return (
        <section>
            <Button variant="contained" color="error" onClick={handleClickOpen}>
                Logout
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {loading ? 'Loading' : 'Are you sure?'}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleLogout()} color="error" autoFocus>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
            {error && <p>{error}</p>}
        </section>
    );
};

export default Logout;