import api from "../api"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FiSearch } from "react-icons/fi"
import { useEffect } from "react"
import "./Navbar.css"
import axios from "axios"
const Navbar = ({ setMessage,setNotes }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm({
    defaultValues:{searchText:""}
  })
  const { pathname } = useLocation()
  const isAuthPage = pathname === "/login" || pathname === "/"
  async function logout() {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true })
      localStorage.removeItem("accessToken");
      navigate("/login")
    }
    catch (err) {
      setMessage(err.response?.data?.message || "logout failed due to network error or server down")
    }
  }
  async function onSubmit(data) {
    try {
      const res = await api.post("/getNotes", data)
      setNotes(res.data.notes)
    }
    catch (err) {
      setMessage(err.response?.data?.message || "Network error or server down")
    }
  }
  const searchText = watch("searchText");
  useEffect(() => {
    if(isAuthPage) return
    if (!searchText) {
      const getnotes = async () => {
        const res = await api.get("/getAllNotes")
        setNotes(res.data.notes)
      }
      getnotes()
    }
  }, [searchText]);
  return (
    <div className="flex" id="nav-container">
      <p style={{ color: "white" }} id="nav-logo">Notes App</p>
      <form action="" id="search-container" className="flex" onSubmit={handleSubmit(onSubmit)}>
        <input id="nav-search" className={isAuthPage ? "hide" : ""} type="text" placeholder="search notes" {...register("searchText")} />
        <button type="submit" className={`flex search-icon-container ${isAuthPage ? "hide" : ""}`} disabled={isSubmitting}>
          <FiSearch id="search-icon" size={16} color="black"/>
        </button>
      </form>
      <button className={`button flex ${isAuthPage ? "hide" : ""}`} onClick={logout} >Logout</button>
    </div>
  )
}

export default Navbar