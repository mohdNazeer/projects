import Navbar from "../components/Navbar"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import "./LoginPage.css"
const LoginPage = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    async function onSubmit(data) {
        try {
            const res = await axios.post("/api/auth/login", data, {withCredentials:true})
            localStorage.setItem("accessToken",res.data.accessToken)
            navigate("/homepage")
        }
        catch (err) {
            setMessage(err.response?.data?.message || "login failed due to network error or server down")
        }
    }
    return (
        <>
            <Navbar setMessage="" setNotes=""/>
            <div style={{ minHeight: "20px" }}>
                {message && <p style={{ color: "red" }}>{message}</p>}
            </div>
            <form className="flex" id="login-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Login</h3>
                <div>
                    <input
                        className="auth-input"
                        type='text'
                        placeholder='username or email'
                        {...register("identifier", { required: "username or email is required" })}
                    />
                    {errors.identifier && <p className="error-message">{errors.identifier.message}</p>}
                </div>
                <div>
                    <input
                        className="auth-input"
                        type='password'
                        placeholder='password'
                        {...register("password",{required:"password is required"})}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>
                <button className='flex auth-button'  disabled={isSubmitting}>Login</button>
                <p>Don't have an account?<Link to="/" id="register-text"> Register</Link></p>
            </form>
        </>
    )
}

export default LoginPage