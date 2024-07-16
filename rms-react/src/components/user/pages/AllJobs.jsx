import React, { useEffect, useState } from 'react'
import Loader from '../../../services/Loader';
import NavBar from './navigation/NavBar';
import JobItemSection from './JobItemSection';
import Footer from '../footer/Footer';
import { fetchApiData } from '../../../api/api';

const AllJobs = () => {
    const [counter, setCounter] = useState(6)
    const [loader, setLoader] = useState(true);
    const [jobs, setJobs] = useState([]);

    const handleClick = () => {
        setCounter(counter + 6);
        
        const fetchData = async () => {
            const response = await fetchApiData(`home/browse/${counter}`);
            if (response.status===true) {
                setJobs(response.data);
            }else {
                console.log(response);
            }
        }
        fetchData();
    }

    // let count = 6;
    // const [loader, setLoader] = useState(true);
    // const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchApiData(`home/browse/${counter}`);
            if (response.status===true) {
                setJobs(response.data);
            }else {
                console.log(response);
            }
        }
        fetchData();
        setTimeout(() => {
            setLoader(false);
        }, 700)
    }, [counter]);
    return (
        <>
            {/* {(loader && <Loader/>) || (
                <>
                    <NavBar hero='jobs' cmp="jobs" />
                    <JobItemSection jobs={jobs.job}/>
                    <div className="load-data">
                        <button className='button' onClick={
                            ++count
                        }>Browse More</button>
                    </div>
                    <Footer />
                </>
            )} */}
            {
                (loader && <Loader /> || (
                    <>
                        <NavBar hero='jobs' cmp="jobs" />
                        <JobItemSection jobs={jobs.job}/>
                        <div className="load-data">
                            <button className='button' onClick={handleClick}>Browse More</button>
                        </div>
                        <Footer />
                    </>
                ))
            }
        </>
    );
};

export default AllJobs