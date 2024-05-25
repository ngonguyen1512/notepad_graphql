import moment from 'moment';
import { useEffect, useState } from 'react';
import { deleteNoteById } from '../utils/noteUtils';
import { IconButton, Tooltip } from '@mui/material';
import { NoteAddOutlinedIcon, DeleteOutlinedIcon } from '../utils/icons';
import { Box, Typography, Grid, List, Card, CardContent, Button } from '@mui/material';
import { Link, Outlet, useParams, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';

export default function NoteList() {
    const submit = useSubmit();
    const navigate = useNavigate();
    const { folder } = useLoaderData();
    const { noteId, folderId } = useParams();
    const [ reload, setReload ] = useState(false);
    const [activeNoteId, setActiveNoteId] = useState(noteId);
    const [deletedNoteIds, setDeletedNoteIds] = useState([]);   

    const handleAddNewNote = async () => {
        submit({
            content: '',
            folderId
        }, {
            method: 'POST',
            action: `/folder/${folderId}`
        })
    }
    const handleDeleteNote = async (id, event) => {
        event.preventDefault();
        console.log('id: ',id);
        navigate(`/folder/${folderId}`);
        deleteNoteById(id);
        setDeletedNoteIds([...deletedNoteIds, id]);
        setReload(true);
    }

    useEffect(() => {
        if (noteId) {
            setActiveNoteId(noteId);
            return;
        }
        if (folder?.notes?.[0]) {
            setReload(true);
            // navigate(`note/${folder.notes[0].id}`);
        }
    }, [noteId, folder.notes, reload])

    const renderNote = ({ id, content, updatedAt }) => {
        return (
            <Link key={id} to={`note/${id}`} style={{ textDecoration: 'none' }} onClick={() => setActiveNoteId(id.toString())}>
                <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', margin: '1% 0', backgroundColor: id.toString() === activeNoteId ? '#3e3ea4' : null, color: id.toString() === activeNoteId ? '#fff' : '#000' }}>
                    <CardContent sx={{ '&:last-child': { padding: '3% 4%' } }}>
                        <div dangerouslySetInnerHTML={{ __html: `${content.substring(0, 30) || 'Empty'} ` }} />
                        <Typography sx={{fontSize:'x-small'}}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                    </CardContent>
                    <Button onClick={(event) => handleDeleteNote(id, event)}><DeleteOutlinedIcon sx={{color: id.toString() === activeNoteId ? '#fff' : '#000'}}/></Button>
                </Card>
            </Link>
        );
    }

    return (
        <Grid container sx={{ width: '100%', height: '100%' }} >
            <Grid items xs={4} sx={{ height: '100%', background: '#8e8ee2' }}>
                <List subheader={
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        <Typography sx={{ fontWeight: 500, color: '#fff', fontSize: '16px' }}>Notes</Typography>
                        <Tooltip title='Add note' onClick={handleAddNewNote}>
                            <IconButton size='small'>
                                <NoteAddOutlinedIcon sx={{color:'#fff'}}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                } sx={{
                    width: '100%', height: '100%', padding: '2%',
                    textAlign: 'left', overflow: 'auto'
                }}>
                    {!reload ? (
                        <> {folder.notes.length > 0 &&  folder.notes.map(renderNote)} </>
                    ): (
                        <> {folder.notes.length > 0 &&  folder.notes.filter(note => !deletedNoteIds.includes(note.id)).map(renderNote)} </>
                    )}
                </List>
            </Grid>
            <Grid items xs={8} sx={{ height: '100%' }}>
                {activeNoteId && <Outlet /> }
            </Grid>
        </Grid>

    )
}
