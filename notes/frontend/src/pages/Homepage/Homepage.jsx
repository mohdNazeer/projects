import Navbar from "../../components/Navbar"
import Note from "../../components/Note"
import { IoAdd } from "react-icons/io5"
import "./Homepage.css"
import { useState } from "react"
import NoteForm from "./NoteForm"
import api from "../../api"
const Homepage = () => {
    const [message, setMessage] = useState("")
    const [noteId, setNoteId] = useState("")
    const [buttonCaption, setButtonCaption] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [notes, setNotes] = useState([])
    return (
        <>
            <Navbar setMessage={setMessage}  setNotes={setNotes}/>
            <div style={{ minHeight: "25px" }}>
                {message && <p style={{ color: "red" }}>{message}</p>}
            </div>
            <div id="note-outer-container" className="flex">
                {notes.map((note) => {
                    return <Note key={note._id} note={note} setShowForm={setShowForm} setButtonCaption={setButtonCaption} setNoteId={setNoteId} api={api} setNotes={setNotes} />
                })}
            </div>
            <div onClick={() => { setShowForm(true); setButtonCaption("Create"); setNoteId("") }} id="add-container" className="flex">
                <IoAdd id="add-icon" size={28} color="white" />
            </div>
            {showForm && <NoteForm buttonCaption={buttonCaption} api={api} onCancel={() => setShowForm(false)} noteId={noteId} setNotes={setNotes} />}
        </>
    )
}

export default Homepage