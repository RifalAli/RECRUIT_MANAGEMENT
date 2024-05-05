import React, { useEffect, useState } from 'react'
import NavBar from './navigation/NavBar'
import ContactForm from './navigation/ContactForm'
import Footer from '../footer/Footer'
import Loader from '../../../services/Loader'

const Contact = () => {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, []);
    return (
        <>
            {loader? (
                <Loader/>
            ) : (
                <>
                    <NavBar hero="contact" cmp="contact"/>
                    <ContactForm />
                    <Footer />
                </>
            )}
        </>
    )
}

export default Contact