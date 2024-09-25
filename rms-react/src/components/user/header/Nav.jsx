import React from 'react';
import logo from '../../../assets/images/logo.svg'
import { Link, useLocation, useParams } from 'react-router-dom';

const showModal = () => {
    let modal = document.getElementsByClassName('logout-modal')[0];

    modal.style.display = 'block';
}

const closeModal = () => {
    let modal = document.getElementsByClassName('logout-modal')[0];

    modal.style.display = 'none';
}

const Nav = ({cmp, addon}) => {
    const location = useLocation();

    const slug = useParams()

    let role = null

    if (localStorage.getItem('role') !== null) {
        role = localStorage.getItem('role')
    }
    
    const saveSlug = () => {
        try {
            let isConditionFulfilled = true;

            if (!location.pathname.includes('user') && !location.pathname.includes('company') && !location.pathname.includes('admin')) {
                isConditionFulfilled = false;
            }

            if (isConditionFulfilled && Object.keys(slug).length >= 1 && slug !== 'undefined' && slug !== null) {
                localStorage.setItem('slug', slug.slug)
            }
        }catch(e) {
            console.log(e)
        }
    }

    saveSlug()
    
    const savedSlug = localStorage.getItem('slug')

    const logout = () => {
        localStorage.clear();
        window.location = '/login';
    }

    const showLogoutModal = () => {
        showModal()
    }

    const authloggedinHandler = () => {
        if (role !== null) logout()
    }

    const emptyFunc = () => {

    }

    return (
        <>
    <div className='home-header-container-nav'>
        <div className="home-header-container-nav-left">
            <div className="home-header-container-nav-left__branding">
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
        </div>
        <div className="home-header-container-nav-right">
            <Link className={`${cmp==='home'?'home-header-container-nav-right--active-menu':''}`} to='/'>Home</Link>
            <Link className={`${cmp==='jobs'?'home-header-container-nav-right--active-menu':''}`} to='/jobs'>Browse Job</Link>
            <Link className={`${cmp==='loggedin'?'home-header-container-nav-right--active-menu'
                                :addon==='loggedin'?'home-header-container-nav-right':'invisible'}`} 
                to={
                    (role === `job seeker`) ? `/user/${savedSlug}`
                    : (role === `company`) ? `/company/${savedSlug}` 
                    : `/admin/${savedSlug}`
                }
                >
                {
                    (role === `job seeker`) ? 'Profile'
                    : (role === `company`) ? 'Company' : 'Admin'
                }
            </Link>
            <Link className={`${cmp==='auth'?'home-header-container-nav-right--active-menu'
                                :cmp === 'loggedin' ? 'home-header-container-nav-right':''}`}
                                
                                to={`${
                                    (cmp === 'loggedin' || addon === 'loggedin') ? ( 
                                        location.pathname
                                    ) : (
                                        (location.pathname === '/sign-up' && '/sign-up') || 
                                        (location.pathname === '/forgot-password' && '/forgot-password') || 
                                        '/login'
                                    )
                                }`}

                                onClick = {
                                    (cmp === 'loggedin' || addon === 'loggedin') ? (
                                        showLogoutModal
                                    ) : (
                                        emptyFunc
                                    )
                                }>

                {
                    (location.pathname === '/sign-up' && 'Sign Up') ||
                    (location.pathname === '/forgot-password' && 'Reset Password') || 
                    (location.pathname.includes('/auth/forgot-password/') && 'New Password') || 
                    (location.pathname === '/login' && 'Login') || 
                    (addon === 'loggedin' && "Logout") ||
                    'Login'
                }
            </Link>
        </div>
    </div>
    <div className="modal logout-modal">
        <div className="modal-container">
                    <form>
                        <div className="form">
                            <h1>Are you sure want to logout?</h1>
                            <div className='button-div'>
                                <button type='button' onClick={authloggedinHandler} className="button">
                                    <div>
                                        <span>Logout</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeModal} className="button button-cancel">
                                    <div>
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
    </div>
        </>
    );
};

export default Nav;