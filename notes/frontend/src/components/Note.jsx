import "./Note.css"
const Note = ({ note, setShowForm, setButtonCaption, setNoteId, api,setNotes }) => {
    async function deleteNote(){
        await api.delete(`/deleteNote/${note._id}`)
        const res = await api.get("/getAllNotes")
        setNotes(res.data.notes)
    }
    return (
        <div className='flex' id="note-container">
            <p className="note-element" style={{ fontSize: "1.125rem" }}>{note.title}</p>
            <p className="note-element">{note.description}</p>
            <p className="note-element" style={{ fontSize: "0.875rem", color: "gray" }}>
                Created at: {new Date(note.createdAt).toLocaleString('en-IN', { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
            <div className="note-element" id="button-container">
                <button className='button' id="button1" onClick={() => { setShowForm(true); setButtonCaption("Update"); setNoteId(note._id) }}>Edit</button>
                <button className='button' onClick={deleteNote}>Delete</button>
            </div>
        </div>
    )
}

export default Note