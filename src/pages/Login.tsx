import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
interface LoginProps {
    setShowRegister: (value: boolean) => void;
}
const Login = ({ setShowRegister }: LoginProps) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)' }}>
            <div style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: 16, boxShadow: '0 8px 32px rgba(60,60,120,0.12)', maxWidth: 350, width: '100%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2d3a4a', fontWeight: 700 }}>Sign In</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <ToastContainer position="top-center" />
                    <label style={{ fontWeight: 500, color: '#2d3a4a' }}>
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px 12px', marginTop: 6, borderRadius: 8, border: '1px solid #bfc8d6', fontSize: 16 }}
                            placeholder="you@email.com"
                        />
                    </label>
                    <label style={{ fontWeight: 500, color: '#2d3a4a' }}>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px 12px', marginTop: 6, borderRadius: 8, border: '1px solid #bfc8d6', fontSize: 16 }}
                            placeholder="••••••••"
                        />
                    </label>
                    <button type="submit" disabled={loading} style={{ padding: '12px 0', borderRadius: 8, background: '#3a7bd5', color: '#fff', fontWeight: 600, fontSize: 17, border: 'none', boxShadow: '0 2px 8px rgba(60,60,120,0.08)', cursor: 'pointer', marginTop: 8 }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 18 }}>
                    <span>Don't have an account? </span>
                    <a onClick={() => setShowRegister(true)} style={{ color: '#3a7bd5', textDecoration: 'underline', cursor: 'pointer' }}>Register</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
