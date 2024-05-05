import React, { useEffect, useState } from 'react'
import NavBar from '../navigation/NavBar'
import LoginItem from './LoginItem'
import Footer from '../../footer/Footer'
import Loader from '../../../../services/Loader'

const Login = () => {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, []);
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <NavBar hero="Login" cmp="auth" />
                    <LoginItem />
                    <Footer />
                </>
            )}
        </>
    )
}

export default Login