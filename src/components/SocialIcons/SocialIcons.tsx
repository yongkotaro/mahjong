import React from "react";
import { EmailRounded, GitHub, LinkedIn } from '@mui/icons-material';
import './SocialIcons.css';

export const SocialIcons = () => {
    return (
        <div>
            <EmailRounded className='email' onClick={() => console.log(1)} />
            <GitHub className='github' />
            <LinkedIn className='linkedIn' />
        </div>
    )
}


