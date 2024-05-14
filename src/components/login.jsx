import React, {useState} from "react"
import axios from "axios"
const baseUrl = "10.22.233.49:3000/login"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        const response = await axios.post(baseUrl,{
            id_credencial:username,
            password: password
        });

        localStorage.setItem("token",response.data.token)
    }

    return (
        <>
            <h1>Iniciar sesión</h1>
            <label>Usuario</label>
            <br />
            <input type="text" value={username} onChange={handleUserChange} />
            <br />
            <label>Contraseña</label>
            <br />
            <input type="password" value={password} onChange={handlePasswordChange} />
            <br />
            <button onClick={handleLogin}>Ingresar</button>
        </>
    );
}

export default LoginPage