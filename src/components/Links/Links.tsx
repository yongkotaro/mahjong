import React from 'react';
import './Links.css';

export const Links: React.FC = () => {
    return (
        <div className="links-container">
            <h1 className="links-title">Resources and Acknowledgments</h1>
            <ul className="links-list">
                <li className="links-list-item">
                    Mahjong Tile pictures from
                    <a href="https://martinpersson.org/" target="_blank" rel="noopener noreferrer" className="link">
                        Martin Persson's website
                    </a>.
                </li>
                <li className="links-list-item">
                    To learn more about common wait patterns in Mahjong, refer to
                    <a href="https://drive.google.com/file/d/1MXvEAwT31RnTJzCqYTpfaL7bd7cmONjT/view" target="_blank" rel="noopener noreferrer" className="link">
                        this Google Drive document
                    </a>.
                </li>
            </ul>
        </div>
    );
};



