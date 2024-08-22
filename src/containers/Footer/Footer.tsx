import React from 'react';
import './Footer.css';
import { SocialIcons, FooterLinks } from '../../components';

export const Footer: React.FC = () => {
    return (
        <footer className="footer" id='contact'>
            <FooterLinks />
            <div className="footer-content">
                <span>© 2024 TileWaiter. All rights reserved.</span>
                <SocialIcons />
            </div>
        </footer>
    );
}
