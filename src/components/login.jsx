import React, { useState, useRef } from "react"
import axios from "axios"
const baseUrl = "10.22.233.49:3000/login"

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [barcode, setBarcode] = useState("");
    const [scanSuccess, setScanSuccess] = useState(false);
    const [scanStatus, setScanStatus] = useState("");
    const [scanning, setScanning] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const barcodeInputRef = useRef(null);

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleBarcodeChange = (event) => {
        setBarcode(event.target.value);
        if (event.target.value !== "") {
            setScanSuccess(true);
            setScanStatus("Escaneo exitoso ✔️");
            setScanning(false);
        }
    };

    const handleLogin = async () => {
        const response = await axios.post(baseUrl, {
            id_credencial: username,
            password: password
        });

        localStorage.setItem("token", response.data.token)
    }

    const handleScan = async () => {
        setScanning(true);
        setShowLogin(false);
        setScanStatus("Esperando matricula...");
        barcodeInputRef.current.focus();
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (barcode !== "") {
            alert(`Se escaneó con éxito el siguiente texto: ${barcode}`);
        }
    }

    const handleCloseScan = () => {
        setShowLogin(true);
        setScanStatus("");
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            gap: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            {showLogin && <>
                <label style={{ fontSize: '20px' }}>Matricula</label>
                <input type="text" value={username} onChange={handleUserChange} style={{ fontSize: '18px', padding: '10px', borderRadius: '5px', width: '300px' }} />
                <label style={{ fontSize: '20px' }}>Contraseña</label>
                <input type="password" value={password} onChange={handlePasswordChange} style={{ fontSize: '18px', padding: '10px', borderRadius: '5px', width: '300px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleLogin} style={{ fontSize: '18px', padding: '10px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Ingresar</button>
                    <button onClick={handleScan} style={{ fontSize: '18px', padding: '10px', borderRadius: '5px', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>Escaner</button>
                </div>
            </>}
            <input type="text" value={barcode} onChange={handleBarcodeChange} ref={barcodeInputRef} style={{ opacity: 0, position: 'absolute' }} />
            {scanStatus && <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '50px',
                border: '1px solid black',
                borderRadius: '20px',
                fontSize: '30px'
            }}>
                <button onClick={handleCloseScan} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', border: 'none', background: 'none', cursor: 'pointer' }}>X</button>
                {scanStatus}
            </div>}
        </div>
    );
}

export default LoginPage