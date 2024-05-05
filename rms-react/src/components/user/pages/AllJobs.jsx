import React, { useEffect, useState } from 'react'
import Loader from '../../../services/Loader';
import NavBar from './navigation/NavBar';
import JobItemSection from './JobItemSection';
import Footer from '../footer/Footer';

const AllJobs = () => {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, []);
    return (
        <>
            {(loader && <Loader/>) || (
                <>
                    <NavBar hero='jobs' cmp="jobs" />
                    <JobItemSection />
                    <Footer />
                </>
            )}
        </>
    );
};

export default AllJobs