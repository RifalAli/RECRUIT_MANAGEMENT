import React from 'react'
import NavBar from '../user/pages/navigation/NavBar'
import CompanyItem from './CompanyItem'
import Footer from '../user/footer/Footer'

const Company = () => {
    return (
        <>
            <NavBar hero='company' cmp="loggedin" />
            <CompanyItem />
            <Footer />
        </>
    )
}

export default Company