import { debounce } from '@mui/material';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';

export default function Note() {
    const submit = useSubmit();
    const location = useLocation();
    const { note } = useLoaderData();
    const [rawHTML, setRawHTML] = useState(note.content);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    
    const handleOnChange = (state) => {
        setEditorState(state);
        setRawHTML(draftToHtml(convertToRaw(state.getCurrentContent())));
    };

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks, 
            blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
    }, [note.id]);

    useEffect(() => {
        debouncedMemorized(rawHTML, note, location.pathname);
    }, [ rawHTML, location.pathname]);
    
    const debouncedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname) => {
            if (rawHTML === note.content) return;
            console.log('aaa: ',{...note, content: rawHTML})
            submit({ ...note, content: rawHTML }, {
                method: 'POST',
                action: pathname
            })
        }, 1000)
    }, [submit]);
    
    useEffect(() => {
        setRawHTML(note.content);
    }, [note.content]);

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder='Write something ...'
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
        />
    );
}
