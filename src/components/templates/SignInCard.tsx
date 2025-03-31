import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { signUpFirebase, loginFirebase } from "../../firebase/fireStoreAuthService.ts";
import { useState } from "react";
import { LoginData } from "../../utils/types-bakery-shop.ts";
import {addUser} from "../../firebase/fireBaseDbUsers.ts";


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

interface SignInCardProps {
    submitFn: (loginData: LoginData) => Promise<void>;
}

export const SignInCard: React.FC<SignInCardProps> = () => {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [formError, setFormError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (validateInputs(email, password)) {
            try {
                if (isSignUp) {
                    await signUpFirebase({ email, password });
                    await addUser(firstName, lastName);
                    navigate('/');
                } else {
                    await loginFirebase({ email, password });
                    navigate('/');
                }
            } catch (error) {
                setFormError(error instanceof Error ? error.message : "Unknown error");
            }
        }
    };

    const validateInputs = (email: string, password: string) => {
        let isValid = true;
        setFormError('');

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!isValid) {
            setFormError('Error: Wrong credentials. Please try again.');
        }

        return isValid;
    };

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" padding={2} alignItems="center" sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2
        }} >

            <Card variant="outlined" sx={{ width: '100%', maxWidth: 400, p: 3 }}>
                <SitemarkIcon />
                <Typography component="h1" variant="h4">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                {formError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {formError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate
                     sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                    {isSignUp && (
                        <>
                            <FormControl>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    autoComplete="given-name"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    autoComplete="family-name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                />
                            </FormControl>
                        </>
                    )}

                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            id="password"
                            name="password"
                            placeholder="••••••"
                            type="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>

                    {!isSignUp && (
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    )}

                    <Button type="submit" variant="contained">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                    </Button>
                </Box>

                {!isSignUp && (
                    <>
                        <Divider>or</Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button fullWidth variant="outlined"
                                    onClick={() => loginFirebase({ email: 'GOOGLE', password: '123456' })}
                                    startIcon={<GoogleIcon />}>
                                Sign in with Google
                            </Button>
                            <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Facebook')}
                                    startIcon={<FacebookIcon />}>
                                Sign in with Facebook
                            </Button>
                        </Box>
                    </>
                )}
            </Card>
        </Box>
    );
};

