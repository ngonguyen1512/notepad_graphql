import { EditIcon } from '../utils/icons';
import React, { useEffect, useState } from 'react';
import { updateFolder } from '../utils/folderUtils'; 
import { useLoaderData, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';

export default function UpdateFolder() {
    const navigate = useNavigate();
    const location = useLocation();
    const { folders } = useLoaderData();
    const [ open, setOpen ] = useState(false);
    const folderId = location.pathname.split("/")[2];
    const [ searchParams, setSearchParam ] = useSearchParams();
    const [ updateFolderName, setUpdateFolderName ] = useState('');
    const popUpName = searchParams.get('popup');

    const handleOpenPopUp = () => {
        setSearchParam({popup:'update-folder'});
    }
    const handleClose = () => {
        setUpdateFolderName('')
        navigate(-1);
    }   
    const handleUpdateFolderChange = (e) => {
        setUpdateFolderName(e.target.value);
    }
    const handleUpdateFolder = async () => {
        await updateFolder(folderId, updateFolderName); 
        handleClose();
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') 
            handleUpdateFolder();
    }

    useEffect(() => {
        if (popUpName === 'update-folder') {
            setOpen(true);
            const folderToUpdate = folders.find(item => item.id === folderId);
            if (folderToUpdate) 
                setUpdateFolderName(folderToUpdate.name);
            return;
        }
        setOpen(false);
    }, [popUpName, folders, folderId]);

    return (
        <div>
            <Tooltip title='Update folder' onClick={handleOpenPopUp}>
                <IconButton size='small'>
                    <EditIcon sx={{color:'#fff'}}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Folder</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus margin='dense' id='name' label='Folder name' 
                        size='small' variant='standard' sx={{width: '400px'}}
                        autoComplete='off' value={updateFolderName} onChange={handleUpdateFolderChange}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdateFolder}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
