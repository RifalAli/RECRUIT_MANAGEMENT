import React, { useEffect, useState } from 'react'
import NavBar from '../navigation/NavBar'
import SignUpItem from './SignUpItem'
import Footer from '../../footer/Footer'
import Loader from '../../../../services/Loader'

const SignUp = () => {
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
                    <NavBar hero='Sign Up' cmp='auth' />
                    <SignUpItem />
                    <Footer />
                </>
            )}
        </>
    )
}

export default SignUp