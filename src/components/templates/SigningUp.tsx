// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Container, Typography } from '@mui/material';
// import { signUpFirebase } from "../../firebase/fireStoreAuthService.ts";
//
// const SignUp = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             await signUpFirebase({ email, password });
//             navigate('/');
//         } catch (error) {
//             console.log(error instanceof Error?error.message:'Registration error');
//         }
//     };
//
//     return (
//         <Container maxWidth="sm">
//             <Typography variant="h4" component="h1" gutterBottom>
//                 Registration
//             </Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Email"
//                     type="email"
//                     fullWidth
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <TextField
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <Button type="submit" variant="contained" color="primary" fullWidth>
//                     Registration
//                 </Button>
//             </form>
//         </Container>
//     );
// };
//
// export default SignUp;