import React from 'react'
import './Hero.css'
import { curve, about_image, video1 } from '../../assets';
import { Button } from '@mui/material';

export const Hero = () => {
    return (
        <div className='hero-container'>
            <h1 className='slogan'> Unleash your skills with {` `}
                <span className='title'> TileWaiter{""} <img className='curve' src={curve} alt='curve-img' />
                </span>
            </h1>
            <p className='hero-paragraph'>Become the next mahjong legend</p>
            <div className='hero-visuals'>
                <div className="hero-display">
                    <img className="hero-image" src={about_image} />
                    <video
                        autoPlay
                        loop
                        muted
                        className="hero-video"
                    >
                        <source src={video1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='hero-buttons'>
                    <Button variant='contained' className='start-button' href='#home'>Try Now</Button>
                    <Button variant='contained' className='doc-button' onClick={() => window.open('https://github.com/yongkotaro/mahjong')}>Git Repo</Button>
                </div>
            </div>
        </div>
    )
}

