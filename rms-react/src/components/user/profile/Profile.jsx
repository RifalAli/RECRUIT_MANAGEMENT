import React, { useEffect, useState } from 'react'
import NavBar from '../pages/navigation/NavBar'
import ProfileItem from './ProfileItem'
import Footer from '../footer/Footer'
import ProfileApplied from './ProfileApplied'
import Loader from '../../../services/Loader'

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