const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Fetch all notes for a user
router.get('/fetchnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ message: 'Server error: Unable to fetch notes' });
    }
});

// Create a new note
router.post('/addnotes', fetchUser, [
    body('title', 'Title must be at least 4 characters long').isLength({ min: 4 }),
    body('description', 'Description must be at least 10 characters long').isLength({ min: 10 }),
    body('tag', 'Tag is required').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation errors', errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const notes = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });
        // res.json(note);
        const savedNote= await notes.save();
        res.json(savedNote);
    } catch (err) {
        console.error('Error creating note:', err);
        res.status(500).json({ message: 'Server error: Unable to create note' });
    }
});



//upadte an existing notes
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNotes = {};

    if (title) { newNotes.title = title };
    if (description) { newNotes.description = description};
    if (tag) { newNotes.tag = tag};

    try {
        
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found.");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized access.");
        }

        const updatednote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });

        if (!updatednote) {
            return res.status(404).send("Failed to update note.");
        }

        res.json({ note: updatednote });
    } catch (error) {
        console.error('Error updating note:',error);
        res.status(500).send("Server error: Unable to update the note.");
    }
});
//route 3:Delete notes
router.delete('/delete/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const biju = await Notes.findById(req.params.id);
        
        if (!biju) {
            return res.status(404).send("Note not found.");
        }

        if (biju.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized access.");
        }

        const deletenotes = await Notes.findByIdAndDelete(req.params.id);
        res.json({lrr: deletenotes});
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).send("Server error: Unable to update the note.");
    }
});

module.exports = router;