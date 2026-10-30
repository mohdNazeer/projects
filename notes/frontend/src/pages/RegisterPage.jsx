import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import "./RegisterPage.css"
const RegisterPage = () => {
    const [message, setMessage] = useState("")
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        axios
            .post("/api/auth/isLoggedIn", {}, { withCredentials: true })
            .then(() => setLoggedIn(true))    // refresh token hai
            .catch(() => setLoggedIn(false))  // nahi hai
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <>
    <Navbar setMessage="" setNotes="" />
    <p style={{fontWeight:"bold";paddingTop:"5px"}}>Loading...</p>
    </>
    if (loggedIn) return navigate("/homepage")
    async function onSubmit(data) {
        try {
            const res = await axios.post("/api/auth/register", data, { withCredentials: true })
            localStorage.setItem("accessToken", res.data.accessToken)
            navigate("/homepage")
        }
        catch (err) {
            setMessage(err.response?.data?.message || "registration failed due to network error or server down")
        }
    }
    return (
        <>
            <Navbar setMessage="" setNotes="" />
            <div style={{ minHeight: "20px" }}>
                {message && <p style={{ color: "red" }}>{message}</p>}
            </div>
            <form className="flex" id="register-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Register</h3>
                <div>
                    <input
                        className="auth-input"
                        type='text'
                        placeholder='username'
                        {...register("username", { required: "username is required", minLength: { value: 3, message: "min-length should be 3" } })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div>
                    <input
                        className="auth-input"
                        type='email'
                        placeholder='email'
                        {...register("email", { required: "email is required" })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        className="auth-input"
                        type='password'
                        placeholder='password'
                        {...register("password", { required: "password is required" })}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>
                <button className='flex auth-button' disabled={isSubmitting}>Register</button>
                <p>Already have an account?<Link to="/login" id="login-text"> Login</Link></p>
            </form>
        </>
    )
}

export default RegisterPage
