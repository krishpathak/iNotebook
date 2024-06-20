import React from 'react'
import { useContext, useEffect } from 'react'
import notecontext from './model/NoteContext'
import NoteState from './model/NotesState';
import Notes from './Notes';
import AddNotes from './AddNotes';
export default function Home() {
    const { state, update,getNotes} = useContext(notecontext);
    useEffect(()=>{
        getNotes()
    },[])
    // useEffect(() => {
    //   update();
    // }, []);
    
    return (
        <>
            <AddNotes/>
            <Notes/>
        </>
    );
}