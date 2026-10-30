import { useForm } from "react-hook-form"
import { useState } from "react"
import "./NoteForm.css"
import { useEffect } from "react"
const NoteForm = ({ onCancel, api, buttonCaption, noteId, setNotes }) => {
    const [message, setMessage] = useState("")
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()
    async function onSubmit(data) {
        try {
            if (noteId) {
                await api.patch(`/updateNote/${noteId}`, data)
                onCancel()
                const res = await api.get("/getAllNotes")
                setNotes(res.data.notes)
            }
            else {
                await api.post("/createNote", data)
                onCancel()
                const res = await api.get("/getAllNotes")
                setNotes(res.data.notes)
            }
        }
        catch (err) {
            setMessage(err.response?.data?.message || "Network error or server down")
        }
    }
    useEffect(() => {
        const getNote = async () => {
            if (!noteId) {
                reset({ title: "", description: "" })
                return
            }
            const res = await api.get(`/getNote/${noteId}`)
            const note = res.data.note
            reset({
                title: note?.title || "",
                description: note?.description || ""
            })
        }
        getNote()
    },[])
    return (
        <div id="note-outer-div" className="flex">
            <form className="note-form-container flex" onSubmit={handleSubmit(onSubmit)}>
                <div style={{ height: "5px" }}>
                    {message && <p style={{ color: "red" }}>{message}</p>}
                </div>
                <h3>{buttonCaption} note</h3>
                <div>
                    <input
                        style={{height:"30px"}}
                        type="text"
                        placeholder="Note title"
                        {...register("title", { required: "title is required" })}
                    />
                    {errors.title && <p style={{ color: "white" }} className="error-message">{errors.title.message}</p>}
                </div>
                <div>
                    <textarea
                        placeholder="Note description"
                        {...register("description", { required: "description is required" })}
                    />
                    {errors.description && (
                        <p style={{ color: "white" }} className="error-message">
                            {errors.description.message}
                        </p>
                    )}
                </div>
                <div>
                    <button
                        className="button"
                        id="note-form-b1"
                        type="submit"
                        style={{ marginRight: "7px", width: "50px" }}
                        disabled={isSubmitting}
                    >
                        {buttonCaption}
                    </button>
                    <button className="button" id="note-form-b2" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default NoteForm