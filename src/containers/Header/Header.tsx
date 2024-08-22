import React from 'react'
import { Navbar, Hero } from '../../components'
import './Header.css'

export const Header = () => {
    return (
        <div className='header-container'>
            <Navbar />
            <Hero />
        </div>
    )
}

