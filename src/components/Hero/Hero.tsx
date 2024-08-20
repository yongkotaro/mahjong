import React from 'react'
import './Hero.css'
import curve from '../../assets/curve.png'

export const Hero = () => {
    return (
        <div className='hero-text'>
            <h1> Unleash your skills with {` `}
                <span> TileWaiter{""} <img className='curve' src={curve} alt='curve-img' />
                </span>
            </h1>
            <p>Become the next mahjong legend</p>
        </div>
    )
}

