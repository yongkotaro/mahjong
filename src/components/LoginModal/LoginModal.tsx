import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import icon from '../../assets/icon.png';
import './LoginModal.css';

interface LoginModalProps {
    onClose?: () => void;
    onRegisterClick?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onRegisterClick }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            onClose?.();
            navigate('/');
        } catch (err) {
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        onRegisterClick?.();
    };

    const handleContinueAsGuest = () => {
        onClose?.();
        navigate('/guest');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <img src={icon} alt="Icon" className="modal-icon" />
                <h2 className="modal-title">Sign In</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label className="form-label">
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="form-input"
                            placeholder="you@email.com"
                        />
                    </label>
                    <label className="form-label">
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="form-input"
                            placeholder="••••••••"
                        />
                    </label>
                    <button type="submit" disabled={loading} className="form-button">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="modal-footer">
                    <p>
                        Don't have an account?{' '}
                        <button
                            type="button"
                            className="link-button"
                            onClick={handleRegisterClick}
                        >
                            Register
                        </button>
                    </p>
                    <p>
                        <button
                            type="button"
                            className="link-button"
                            onClick={handleContinueAsGuest}
                        >
                            Continue as Guest
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
