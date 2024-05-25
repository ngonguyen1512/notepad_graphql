import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user: { displayName, photoURL, auth } } = useContext(AuthContext);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        auth.signOut();
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '1% 2%', background: '#313185', color: '#fff' }}>
            <Typography sx={{fontWeight: 600}}>NOTE APP</Typography>
            <Box sx={{ display: 'flex', width: ' 50%', justifyContent: 'end' }} onClick={handleClick}>
                <Typography>{displayName}</Typography>
                <Avatar alt='avatar' src={photoURL} sx={{ width: 24, height: 24, marginLeft: '2%' }} />
            </Box>
            <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClick={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    )
}
