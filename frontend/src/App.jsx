import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const res = await fetch('http://localhost:5000/api/notes')
    const data = await res.json()
    setNotes(data)
  }

  const createNote = async () => {
    if (!title || !content) return
    await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    setTitle('')
    setContent('')
    fetchNotes()
  }

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE'
    })
    fetchNotes()
  }

  const startEditing = (note) => {
    setEditingNote(note)
    setTitle(note.title)
    setContent(note.content)
  }

  const updateNote = async () => {
    if (!title || !content) return
    await fetch(`http://localhost:5000/api/notes/${editingNote._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    setEditingNote(null)
    setTitle('')
    setContent('')
    fetchNotes()
  }

  const cancelEdit = () => {
    setEditingNote(null)
    setTitle('')
    setContent('')
  }

  return (
    <div className="app">
      <h1>My Notes</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {editingNote ? (
          <div className="edit-buttons">
            <button className="save-btn" onClick={updateNote}>Save Changes</button>
            <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <button onClick={createNote}>Add Note</button>
        )}
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-card" key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="card-buttons">
              <button className="edit-btn" onClick={() => startEditing(note)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App