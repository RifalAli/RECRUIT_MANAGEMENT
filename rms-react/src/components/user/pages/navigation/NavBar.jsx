import React from 'react'
import Nav from '../../header/Nav'
import NavHero from './NavHero'

const NavBar = ({ hero, cmp, job }) => {
    let addon = null
    if (localStorage.getItem('token') !== null) {
        addon = 'loggedin'
    }

    return (
        <header className='header'>
            <div className='container'>
                <Nav cmp={cmp} addon={addon}/>
                <NavHero hero={hero} job={job} />
            </div>
        </header>
    )
}

export default NavBar