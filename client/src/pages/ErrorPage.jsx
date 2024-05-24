import { useRouteError } from "react-router-dom"
import { Box, Typography } from '@mui/material'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <Box id='error-page' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant='h1' component='h1'>Oops!</Typography>
            <Typography variant='body1' component='p' sx={{ margin: '2% 0' }}>Sorry, an unexpected error has occurred</Typography>
            <Typography variant='body2' component='p' sx={{paddingBottom: '10%'}}>
                <i>{error.statusText || error.message}</i>
            </Typography>
        </Box>
    )
}
