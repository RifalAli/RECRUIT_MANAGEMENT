import React, { useEffect, useState } from 'react'
import NavBar from '../pages/navigation/NavBar'
import Footer from '../footer/Footer'
import JobDetailsItem from './JobDetailsItem'
import Loader from '../../../services/Loader'

const JobDetails = () => {
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
                    <NavBar cmp='jobs' />
                    <JobDetailsItem />
                    <Footer />
                </>
            )}
        </>
    )
}

export default JobDetails