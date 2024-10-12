import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import authenticationService from "../../../services/authentication-service"
import { Registration } from "../../../models/security/user-credentials"
import '../login/Login.css'; 

export default function Register()
{
    const navigate = useNavigate()

    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [role, setRole] = useState<string>('USER')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function registerHandler(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault()

        if (!username || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const registration = new Registration()
            registration.username = username
            registration.password = password
            registration.confirmPassword = confirmPassword
            registration.role = role

            await authenticationService.register(registration);

            navigate('/login')
        } catch (error) {
            setErrorMessage("Registration failed. Username may already be taken.");
        }
    }

    return (
        <div className="form-container">
            <h2 id="register-header">Register</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="auth-form" onSubmit={registerHandler} method="post">
                <div className="row">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" name="username" id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="row">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="row">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" className="form-control" name="confirm-password" id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="row">
                    <label htmlFor="role">Select Role:</label>
                    <select className="form-select form-control" name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="USER">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button id="register-btn" className="btn btn-success" type="submit">Register</button>
            </form>
            <Link id="login-link" to="/login">Login</Link>
        </div>
    )
}
