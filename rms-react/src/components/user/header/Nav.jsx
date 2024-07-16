import React from 'react';
import logo from '../../../assets/images/logo.svg'
import { Link, useLocation, useParams } from 'react-router-dom';

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
    }

    const authloggedinHandler = () => {
        if (role !== null) logout()
    }

    console.log(slug)
    console.log(role)
    return (
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
            {/* <Link className={`${cmp==='blogs'?'home-header-container-nav-right--active-menu':''}`} to='/blogs'>Blog</Link> */}
            {/* <Link className={`${cmp==='contact'?'home-header-container-nav-right--active-menu':''}`} to='/contact'>Contact</Link> */}
            <Link className={`${cmp==='loggedin'?'home-header-container-nav-right--active-menu'
                                :addon==='loggedin'?'home-header-container-nav-right':'invisible'}`} 
                to={
                    (role === `job seeker`) ? `/user/${savedSlug}`
                    : (role === `company`) ? `/company/${savedSlug}` 
                    : `/admin/${savedSlug}`
                    // `${
                    // // (location.pathname === '/user/:slug' && '/sign-up') || 
                    // // (location.pathname === '/forgot-password' && '/forgot-password') || 
                    // // '/login'
                    // }`
                }
                >
                {
                    // (location.pathname === '/user/:slug' && 'Sign Up') ||
                    // (location.pathname === '/forgot-password' && 'Reset Password') || 
                    // 'Login'
                    (role === `job seeker`) ? 'Profile'
                    : (role === `company`) ? 'Company' : 'Admin'
                }
            </Link>
            <Link className={`${cmp==='auth'?'home-header-container-nav-right--active-menu'
                                :cmp === 'loggedin' ? 'home-header-container-nav-right':''}`} 
                to={`${
                    // (location.pathname === '/sign-up' && '/sign-up') || 
                    // (location.pathname === '/forgot-password' && '/forgot-password') || 
                    // '/login'
                    (location.pathname === '/sign-up' && '/sign-up') || 
                    (location.pathname === '/forgot-password' && '/forgot-password') || 
                    '/login'
                }`}
                
                onClick={
                    authloggedinHandler
                }
                
                >
                {
                    (location.pathname === '/sign-up' && 'Sign Up') ||
                    (location.pathname === '/forgot-password' && 'Reset Password') || 
                    (location.pathname === '/login' && 'Login') || 
                    (addon === 'loggedin' && "Logout") ||
                    'Login'
                }
            </Link>

            {/* <Link className={`${cmp==='profile'?'home-header-container-nav-right--active-menu':''}`} to='/jobs'>Profile</Link> */}

            {
                // link to user slug or company slug or admin slug
            }

            {/* {
                cmp === 'profile' ? (<>
                    <Link className={`${cmp==='profile'?'home-header-container-nav-right--active-menu':''}`} to='/jobs'>Profile</Link>
                </>) :
            } */}
        </div>
    </div>
    );
};

export default Nav;