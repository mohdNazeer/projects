import Navbar from "../components/Navbar"
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import "./RegisterPage.css"
const RegisterPage = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    async function onSubmit(data) {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", data, {withCredentials:true})
            localStorage.setItem("accessToken",res.data.accessToken)
            navigate("/homepage")
        }
        catch (err) {
            setMessage(err.response?.data?.message || "registration failed due to network error or server down")
        }
    }
    return (
        <>
            <Navbar setMessage="" setNotes=""/>
            <div style={{minHeight:"20px"}}>
                {message && <p style={{color:"red"}}>{message}</p>}
            </div>
            <form className="flex" id="register-container" onSubmit={handleSubmit(onSubmit)}>
                <p>Register</p>
                <div>
                    <input
                        type='text'
                        placeholder=' username'
                        {...register("username", { required: "username is required", minLength: { value: 3, message: "min-length should be 3" } })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div>
                    <input
                        type='email'
                        placeholder=' email'
                        {...register("email", { required: "email is required" })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        type='password'
                        placeholder=' password'
                        {...register("password", { required: "password is required" })}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>
                <button className='flex button' id="register-button" disabled={isSubmitting}> Register</button>
                <p>Already have an account?<Link to="/login" id="login-text"> Login</Link></p>
            </form>
        </>
    )
}

export default RegisterPage