import React from 'react'
import './Hero.css'
import { curve, about_image, video1 } from '../../assets';
import { Button } from '@mui/material';
import { GitHub, Construction } from '@mui/icons-material';

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
                    <div className='image-wrapper'>
                        <img className="hero-image" src={about_image} alt='hero' />
                        <span className='image-text'>[Without TileWaiter]</span>
                    </div>
                    <div className='image-wrapper'>
                        <video
                            autoPlay
                            loop
                            muted
                            className="hero-video"
                        >
                            <source src={video1} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <span className='image-text'>[With TileWaiter] </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

