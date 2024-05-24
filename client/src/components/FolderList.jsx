import { Box, Card, CardContent, List, Typography } from '@mui/material'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import NewFolder from './NewFolder';

export default function FolderList({ folders }) {
    const { folderId } = useParams();
    const [activeFolderId, setActiveFolderId] = useState(folderId);
    return (
        <List subheader={
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{ fontWeight: 500, color: '#fff', fontSize: '16px' }}>Folders</Typography>
                <NewFolder />
            </Box>
        } sx={{
            width: '100%', height: '100%', padding: '2%',
            textAlign: 'left', overflow: 'auto'
        }}>
            {folders.map(({ id, name }) => {
                return (
                    <Link key={id} to={`folder/${id}`} style={{ textDecoration: 'none' }} onClick={() => setActiveFolderId(id.toString())}>
                        <Card sx={{ margin: '1% 0', backgroundColor: id.toString() === activeFolderId ? '#8e8ee2' : null }}>
                            <CardContent sx={{ '&:last-child': { padding: '3% 4%' } }}>
                                <Typography>{name}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}
        </List>
    )
}
