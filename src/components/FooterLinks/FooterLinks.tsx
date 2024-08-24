import React from 'react'
import './FooterLinks.css'

export const FooterLinks = () => {
    return (
        <div className='footer-links-container'>
            <ul className='footer-list'>
                <span>TILEWAITER</span>
                <li className="link-item">
                    <a className="footer-link" href='#highlights'>
                        Highlights
                    </a>
                </li>
                <li className="link-item">
                    <a className="footer-link" href='#home'>
                        Home
                    </a>
                </li>
            </ul>
            <ul className='footer-list'>
                <span>RESOURCES </span>
                <li className="link-item">
                    <a className="footer-link" href='#terms'>
                        Terms
                    </a>
                </li>
                <li className="link-item">
                    <a className="footer-link" href='#links'>
                        Links
                    </a>
                </li>
            </ul>
        </div>
    )
}

