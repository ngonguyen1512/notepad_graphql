import { Box, Typography, Grid, List, Card, CardContent } from '@mui/material'
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLoaderData, useNavigate, useSearchParams, useSubmit } from 'react-router-dom';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { IconButton, Tooltip } from '@mui/material'
import moment from 'moment'

export default function NoteList() {
    const navigate = useNavigate();
    const { noteId, folderId } = useParams();
    const [activeNoteId, setActiveNoteId] = useState(noteId);
    const { folder } = useLoaderData();

    const submit = useSubmit();
    const handleAddNewNote = async () => {
        submit({
            content: '',
            folderId
        }, {
            method: 'POST',
            action: `/folder/${folderId}`
        })
    }
    useEffect(() => {
        if (noteId) {
            setActiveNoteId(noteId);
            return;
        } 
        if (folder?.notes?.[0]) {
            navigate(`note/${folder.notes[0].id}`);
        }
    }, [noteId, folder.notes])

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
                    {folder.notes.map(({ id, content, updatedAt }) => {
                        return (
                            <Link key={id} to={`note/${id}`} style={{ textDecoration: 'none' }} onClick={() => setActiveNoteId(id.toString())}>
                                <Card sx={{ margin: '1% 0', backgroundColor: id.toString() === activeNoteId ? '#3e3ea4' : null, color: id.toString() === activeNoteId ? '#fff' : '#000' }}>
                                    <CardContent sx={{ '&:last-child': { padding: '3% 4%' } }}>
                                        <div dangerouslySetInnerHTML={{ __html: `${content.substring(0, 30) || 'Empty'} ` }} />
                                        <Typography sx={{fontSize:'x-small'}}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </List>
            </Grid>
            <Grid items xs={8} sx={{ height: '100%' }}>
                <Outlet />
            </Grid>
        </Grid>

    )
}
