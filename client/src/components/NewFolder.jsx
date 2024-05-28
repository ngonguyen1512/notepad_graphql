import React, { useEffect, useState } from 'react';
import { addNewFolder } from '../utils/folderUtils';
import { AddCircleOutlineIcon } from '../utils/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';

export default function NewFolder() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [searchParams, setSearchParam] = useSearchParams();
    const popUpName = searchParams.get('popup');

    const handleOpenPopUp = () => {
        setSearchParam({ popup: 'add-folder' });
    };

    const handleClose = () => {
        setNewFolderName('');
        navigate(-1);
    };

    const handleNewFolderChange = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleAddNewFolder = async () => {
        await addNewFolder({ name: newFolderName });
        handleClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddNewFolder();
        }
    };

    useEffect(() => {
        if (popUpName === 'add-folder') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [popUpName]);

    return (
        <div>
            <Tooltip title='Add folder' onClick={handleOpenPopUp}>
                <IconButton size='small'>
                    <AddCircleOutlineIcon sx={{ color: '#fff' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus margin='dense' id='name' 
                        label='Folder name' size='small' variant='standard'
                        sx={{ width: '400px' }} autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderChange}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
