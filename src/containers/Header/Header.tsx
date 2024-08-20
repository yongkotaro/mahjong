import React from 'react'
import { Navbar, Hero } from '../../components'
import './Header.css'

export const Header = () => {
    return (
        <div className='container'>
            <Navbar />
            <Hero />
        </div>
    )
}

