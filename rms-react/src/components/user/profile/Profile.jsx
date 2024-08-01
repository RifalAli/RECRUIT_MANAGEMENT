import React, { useEffect, useState } from 'react'
import NavBar from '../pages/navigation/NavBar'
import ProfileItem from './ProfileItem'
import Footer from '../footer/Footer'
import ProfileApplied from './ProfileApplied'
import Loader from '../../../services/Loader'

const Profile = () => {
    // const [loader, setLoader] = useState(true)
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 300);
    // }, []);
    return (
        <>
            <NavBar hero='user profile' cmp="loggedin" />
            <ProfileItem />
            {/* <ProfileItem /> */}
            {/* <ProfileApplied /> */}
            <Footer />
        </>
    )
}

export default Profile