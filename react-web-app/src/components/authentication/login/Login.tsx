import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginCredentials } from "../../../models/security/user-credentials"
import authenticationService from "../../../services/authentication-service"
import { login } from "../../../store/features/authentication-slice"
import { useAppDispatch } from "../../../store/hooks"
import './Login.css';

export default function Login()
{
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function loginHandler(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault()

        if (!username || !password) {
            setErrorMessage("Username and password are required.");
            return;
        }

        try {
            const credentials = new LoginCredentials()
            credentials.username = username
            credentials.password = password

            const authUser = await authenticationService.login(credentials);
            dispatch(login(authUser))
            navigate('/')
        } catch (error) {
            setErrorMessage("Invalid username or password.");
        }
    }

    return (
        <div className="form-container">
            <h2 id="login-header">Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="auth-form" onSubmit={loginHandler} method="post">
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
                <button id="login-btn" className="btn btn-success" type="submit">Login</button>
            </form>
            <Link id="register-link" to="/register">Register as new user</Link>
        </div>
    )
}
