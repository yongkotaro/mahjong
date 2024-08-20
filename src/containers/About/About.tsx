import React from 'react';
import about_image from '../../assets/about.png';
import './About.css';

export const About = () => {
    return (
        <div className='about'>
            <div className='about-container'>
                <img src={about_image} alt='icon' />
                <div className='col-2'>
                    <h2>About</h2>
                    <span className='line'></span>
                    <p>I am Kotaro, a CS student studying in NUS. I always struggled to see patterns in mahjong hands. I made this app in hopes of playing better and faster!</p>
                </div>
            </div>
        </div>
    )
}

