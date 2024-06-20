import React, { useState } from 'react';
import NoteContext from './NoteContext'; // Assuming you have a NoteContext file

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const initialState = [];
  const [notes, setNotes] = useState(initialState);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`http://localhost:5000/api/no/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const note = await response.json();
    setNotes(note);
  }

  const addNotes = async (title, description, tag) => {
    try {
        const response = await fetch('http://localhost:5000/api/no/addnotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title:title, description:description, tag:tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    } catch (error) {
        console.error('Error:haha', error);
    }
};


  // Delete notes
  const deleteNotes = async (id) => {
    let url = `${host}/api/no/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  // Edit notes
  const editNotes = async (id, title, description, tag) => {
    let url = `${host}/api/no/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, setNotes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
