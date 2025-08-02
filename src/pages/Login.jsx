import { useState, useEffect } from 'react'
import supabase from '../lib/superbase-client'
import { useNavigate } from 'react-router-dom'

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    // Cek session saat mount
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            if (data.session) {
                navigate('/dashboard')
            } else {
                setLoading(false)
            }
        }
        checkSession()
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
        } else {
            navigate('/dashboard')
        }
    };

    // Inline CSS konsisten dengan Dashboard
    const bgStyle = {
        minHeight: '100vh',
        minWidth: '100vw', // tambahkan ini agar menutupi seluruh viewport
        background: '#f3f4f6',
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // tambahkan ini agar tetap menutupi viewport
        top: 0,
        left: 0,
        zIndex: 1
    }
    const cardStyle = {
        maxWidth: 480,
        margin: '0 auto',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        borderRadius: 16,
        padding: 24
    }
    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1f2937',
        textAlign: 'center'
    }
    const descStyle = {
        marginBottom: 24,
        color: '#4b5563',
        textAlign: 'center'
    }
    const inputStyle = {
        width: '100%',
        padding: '12px 10px',
        borderRadius: 8,
        border: '1px solid #ccc',
        marginBottom: 16,
        fontSize: '1rem',
        background: '#f3f4f6',
        color: '#000'
    }
    const buttonStyle = {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        fontWeight: 600,
        padding: '12px 0',
        borderRadius: 8,
        color: '#fff',
        background: '#2563eb',
        border: 'none',
        marginBottom: 0,
        cursor: 'pointer',
        transition: 'background 0.2s',
        fontSize: '1rem'
    }
    const buttonHoverStyle = {
        background: '#1d4ed8'
    }
    const errorStyle = {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center'
    }

    // State untuk hover button
    const [isHover, setIsHover] = useState(false);

    if (loading) return null

    return (
        <div style={bgStyle}>
            <form style={cardStyle} onSubmit={handleLogin}>
                <h2 style={titleStyle}>Login</h2>
                <p style={descStyle}>Silakan login untuk masuk ke dashboard admin.</p>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                {error && <p style={errorStyle}>{error}</p>}
                <button
                    type='submit'
                    style={isHover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    Login
                </button>
            </form>
        </div>
    )
}