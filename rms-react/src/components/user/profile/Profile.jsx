import React from 'react'
import NavBar from '../pages/navigation/NavBar'
import ProfileItem from './ProfileItem'
import Footer from '../footer/Footer'

const Profile = () => {
    return (
        <>
            <NavBar hero='user profile' cmp="loggedin" />
            <ProfileItem />
            <Footer />
        </>
    )
}

export default Profile