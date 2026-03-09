import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import icon from '../../assets/icon.png';
import './RegisterModal.css';

interface RegisterModalProps {
    onClose?: () => void;
    onLoginClick?: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onLoginClick }) => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(email, username, password);
            toast.success('Registration successful! Please login.');
            onLoginClick?.();
        } catch (err) {
            toast.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = () => {
        onLoginClick?.();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <img src={icon} alt="Icon" className="modal-icon" />
                <h2 className="modal-title">Create Account</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label className="form-label">
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            className="form-input"
                            placeholder="Your username"
                        />
                    </label>
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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="modal-footer">
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className="link-button"
                            onClick={handleLoginClick}
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
