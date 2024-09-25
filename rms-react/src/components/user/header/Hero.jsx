import React from 'react';
import heroImage from '../../../assets/images/hero.svg';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="home-header-container-hero">
            <div className="home-header-container-hero__left">
                <h1>Efficient Recruitment, Bright Future</h1>
                <p>
                    Experience a streamlined recruitment process that brings together the best talent and the best employers in one place. <i>Don't miss the chance to find your perfect match and elevate your career or business today</i>
                </p>
                <div className="home-header-container-hero__left-search">
                    <Link to='/jobs' className='home-header-container-hero__left-search__form--search-btn'>Find Job Now</Link>
                </div>
            </div>
            <div className="home-header-container-hero__right">
                <img src={heroImage} alt="hero img" />
            </div>
        </div>
    );
};

export default Hero;