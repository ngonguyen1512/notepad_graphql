import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { addNewFolder } from '../utils/folderUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NewFolder() {
    const navigate = useNavigate();
    const [ searchParams, setSearchParam ] = useSearchParams();
    const [ open, setOpen ] = useState(false);
    const [ newFolderName, setNewFolderName ] = useState({});

    const popUpName = searchParams.get('popup');
    const handleOpenPopUp = () => {
        // setOpen(true);
        setSearchParam({popup:'add-folder'});
    }
    const handleClose = () => {
        // setOpen(false);
        setNewFolderName('')
        navigate(-1);
    }   
    const handleNewFolderChange = (e) => {
        setNewFolderName(e.target.value);
    }
    const handleAddNewFolder = async () => {
        console.log(newFolderName)
        const { addFolder } = await addNewFolder({name: newFolderName});
        console.log({addFolder});
        handleClose();
    }
    useEffect (() => {
        if(popUpName === 'add-folder') {
            setOpen(true);
            return;
        }
        setOpen(false);
    }, [popUpName])
  return (
    <div>
        <Tooltip title='Add folder' onClick={handleOpenPopUp}>
            <IconButton size='small'>
                <CreateNewFolderOutlinedIcon sx={{color:'#fff'}}/>
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Folder</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus margin='dense' id='name' label='Folder name' 
                    size='small' variant='standard' sx={{width: '400px'}}
                    autoComplete='off' value={newFolderName} onChange={handleNewFolderChange}
                >

                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddNewFolder}>OK</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
