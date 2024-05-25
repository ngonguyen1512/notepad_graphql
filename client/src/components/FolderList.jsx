import { useEffect, useState } from 'react';
import { NewFolder, UpdateFolder } from './index';
import { DeleteOutlinedIcon } from '../utils/icons';
import { deleteFolderById } from '../utils/folderUtils';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, List, Typography, IconButton } from '@mui/material';

export default function FolderList({ folders }) {
    const navigate = useNavigate();
    const { folderId } = useParams();
    const [ reload, setReload ] = useState(false);
    const [ activeFolderId, setActiveFolderId ] = useState(folderId);
    const [ deletedFolderIds, setDeletedFolderIds ] = useState([]);   

    const handleDeleteNote = async (id, event) => {
        event.preventDefault();
        navigate('/');
        deleteFolderById(id);
        setDeletedFolderIds([...deletedFolderIds, id]);
        setReload(true);
    }
    useEffect(() => {
        setReload(true); 
    }, [folderId, reload])

    const renderFolder = ({ id, name }) => {    
        return (
            <Box key={id}>
                <Link to={`folder/${id}`} style={{ textDecoration: 'none' }} onClick={() => setActiveFolderId(id.toString())}>
                    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1% 0', backgroundColor: id.toString() === activeFolderId ? '#8e8ee2' : null }}>
                        <CardContent sx={{ '&:last-child': { padding: '3% 4%' } }}>
                            <Typography>{name}</Typography>
                        </CardContent>
                        <Button onClick={(event) => handleDeleteNote(id, event)}><DeleteOutlinedIcon sx={{color: id.toString() === activeFolderId  ? '#fff' : '#000'}}/></Button>
                    </Card>
                </Link>
            </Box>
        );
    }

    return (
        <List subheader={
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{ fontWeight: 500, color: '#fff', fontSize: '16px' }}>Folders</Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <UpdateFolder />
                    <NewFolder/>
                </Box>
            </Box>
        } sx={{
            width: '100%', height: '100%', padding: '2%',
            textAlign: 'left', overflow: 'auto'
        }}>
            {!reload ? (
                <> {folders.map(renderFolder)} </>
            ): (
                <> {folders.filter(folder => !deletedFolderIds.includes(folder.id)).map(renderFolder)} </>
            )}
        </List>
    );
}
