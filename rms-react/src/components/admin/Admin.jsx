import React from 'react'
import NavBar from '../user/pages/navigation/NavBar'
import Footer from '../user/footer/Footer'
import AdminItem from './AdminItem'

const Admin = () => {
    return (
        <>
            <NavBar hero='admin' cmp="loggedin" />
            <AdminItem />
            <Footer />
        </>
    )
}

export default Admin