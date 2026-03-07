import './Footer.css';
import { SocialIcons } from '../../components';

export const Footer = () => {
    return (
        <footer className="footer" id='contact'>
            <div className="footer-content">
                <span>© 2024 TileWaiter. All rights reserved.</span>
                <span>Mahjong tile images by <a href="https://martinpersson.org/" className="link">
                    Martin Persson
                </a></span>
                <SocialIcons />
            </div>
        </footer>
    );
}
