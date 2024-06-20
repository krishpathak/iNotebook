import React, { useContext, useState } from 'react';
import NoteContext from './model/NoteContext';
export default function AddNotes() {
    const context = useContext(NoteContext);
    const { addNotes } = context;
    const [notes, setnotes] = useState({ title: "", description: "", tag: "" })
    const handleonclick = (e) => {
        e.preventDefault();
        console.log(notes);
        addNotes(notes.title,notes.description,notes.tag);
    }
    const handleonchange = (e) => {
        setnotes({ ...notes, [e.target.name]: e.target.value })
        console.log(notes)
    }
    return (

        <div className='container my-3'>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Enter the title more than 5 words"onChange={handleonchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter description more than 10 words"onChange={handleonchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"> Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleonchange}  placeholder="Enter the title more than 5 words"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleonclick}>Add Notes</button>
            </form>
        </div>
    );
}
