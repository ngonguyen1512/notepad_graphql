import { Box, Typography, Button } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { graphQLRequest } from '../utils/request';

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);
    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        // const {user} = await signInWithPopup(auth, provider);
        // console({user})
        const result = await signInWithPopup(auth, provider);
        const { user: { uid, displayName } } = result;

        const response = await graphQLRequest({
            query: `
                mutation register($uid: String!, $name: String!) {
                    register(uid: $uid, name: $name) {
                        uid
                        name
                    }
                }
            `,
            variables: {
                uid,
                name: displayName
            }
        });

        console.log('register',{ response });
    }

    if(localStorage.getItem('accessToken')) {
        return <Navigate to={'/'} />;
    }
    return (
        <Box sx={{ margin: '5% 0' }}>
            <Typography variant='h4'>Welcome To Note App</Typography>
            <Button variant='outlined' sx={{ margin: '2% 0' }}
                onClick={handleLoginWithGoogle}
            >
                Login with Google
            </Button>
        </Box>
    )
}
