import React from 'react';
import Hero from './Hero';
import Nav from './Nav';

const Header = ({cmp}) => {
    let addon = null
    if (localStorage.getItem('token') !== null) {
        addon = 'loggedin'
    }
    return (
        <header className='home-header'>
            <div className="home-header-container">
                <Nav cmp={cmp} addon={addon}/>
                <Hero/>
            </div>
        </header>
    );
};

export default Header;