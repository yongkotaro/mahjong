import React from "react";
import { EmailRounded, GitHub, LinkedIn } from '@mui/icons-material';
import './SocialIcons.css';

export const SocialIcons = () => {
    return (
        <div className='socials'>
            <span className='icon-container'>
                <EmailRounded className='email' onClick={() => window.open('mailto:yongkotaro@gmail.com')} fontSize="large" />
            </span>
            <span className='icon-container'>
                <GitHub className='github' onClick={() => window.open('https://github.com/yongkotaro')} fontSize="large" />
            </span>
            <span className='icon-container'>
                <LinkedIn className='linkedin' onClick={() => window.open('https://www.linkedin.com/in/yongkotaro/')} fontSize="large" />
            </span>
        </div>
    )
}


