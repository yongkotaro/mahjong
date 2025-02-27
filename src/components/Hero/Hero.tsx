import './Hero.css'
import { curve } from '../../assets';

export const Hero = () => {
    return (
        <div className='hero-container'>
            <h1 className='slogan'> Unleash your skills with {` `}
                <span className='title'> TileWaiter{""} <img className='curve' src={curve} alt='curve-img' />
                </span>
            </h1>
            <p className='hero-paragraph'>Become the next mahjong legend</p>
        </div>
    )
}

