import React from 'react';
import './Footer.css';
import { SocialIcons } from '../../components';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <span>© 2024 TileWaiter. All rights reserved.</span>
                <span>Terms · Privacy Policy</span>
                <SocialIcons />
            </div>
        </footer>
    );
}
