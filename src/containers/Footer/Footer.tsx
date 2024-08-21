import React from 'react';
import './Footer.css';
import { SocialIcons, FooterLinks } from '../../components';

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <FooterLinks />
            <div className="footer-content">
                <span>Terms · Privacy Policy</span>
                <span>© 2024 TileWaiter. All rights reserved.</span>
                <SocialIcons />
            </div>
        </footer>
    );
}
