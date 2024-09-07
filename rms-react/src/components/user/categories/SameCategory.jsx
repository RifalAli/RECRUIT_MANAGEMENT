import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchApiData, storeApiData } from '../../../api/api';
import Loader from '../../../services/Loader';
import NavBar from '../pages/navigation/NavBar';
import JobDetailsItem from '../jobs/JobDetailsItem';
import Footer from '../footer/Footer';
import FeaturedJobItem from '../featured-jobs/FeaturedJobItem';
import FeaturedJob from '../featured-jobs/FeaturedJob';
import axios from 'axios';

const SameCategory = () => {
    const {slug} = useParams();
    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState([]);
    const [job, setJob] = useState([]);
    const [jobCount, setJobCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const totalPageArray = []
    const [pageArray, setPageArray] = useState([])

    const pageObjects = {
        jobCount: jobCount, 
        currentPage: currentPage, 
        totalPage: totalPage,
    };

    const fetchJobs = async () => {
        await storeApiData(`category/${slug}/${currentPage}`)
        .then((response) => { setJob(response.data); setTotalPage(response.data.totalPage); setCurrentPage(response.data.currentPage); setJobCount(response.data.jobCount) })
        .catch((response) => {})
    }

    useEffect(() => {
        const fillData = () => {
            for (let i = 1; i <= totalPage; i++) {
                totalPageArray.push(i)
            }
        }

        fillData()
        // console.log(totalPageArray)
        setPageArray(totalPageArray)
    }, [totalPage])

    useEffect(() => {
        const checkUser = () => {
            if (user !== 'no') {
            // if (user !== 'none') {
                const formData = new FormData();
                formData.append('user_id', user.id);
                
                fetchData(formData)
            }else {
                fetchData(null)
            }
        }
        const fetchData = async (formData) => {
            const response = await storeApiData(`category/jobs/${slug}/${currentPage}`, formData);
            if (response.data) {
                setJob(response.data)
                setTotalPage(response.data.totalPage)
                // setCurrentPage(response.data.currentPage)
                setJobCount(response.data.jobCount)
            }
        }
        checkUser()
    }, [user, currentPage])

    useEffect(() => {
        const getUser = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.get('http://localhost:8000/auth/user-profile', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, 
                        },
                    });
                    setUser(response?.data.data);
                } catch (error) {
                    console.log(error.response?.data);
                }
            }else {
                setUser('none')
            }
        }
        getUser();
        // fetchData();
        // fetchCategory()s
        setTimeout(() => {
            setLoader(false);
        }, 4000)
    }, [currentPage]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         const fetchData = async() => {
    //             const response = await fetchApiData(`categories/jobs/${slug}`);
    //             if (response && response.status && response.status === true) {
    //                 setJob(response.data);
    //             }else {
    //                 console.log(response);
    //             }
    //             setLoader(false);
    //         };
    //         fetchData();
    //     }, 300);
    // }, [slug]);
    console.log(job && job)
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <NavBar job={job.job} cmp='jobs' />
                    {
                        job.same && job.same ? (
                            <>
                                {/* <p>Page {currentPage} of {totalPage} with total of {jobCount} jobs</p> */}
                                <FeaturedJob featured={job.same} count={job.same.length} similar={'category'} name={job.categories.name} pageObjects={pageObjects} />
                            </>
                        ) : (
                            <>
                                <div className='no-jobs'>
                                    <h1>Job not Found</h1>
                                    <p>There is no job in this category</p>
                                </div>
                            </>
                        )
                    }
                    <div className='page__wrapper'>
                    {
                        job.same && job.same ? (    
                            pageArray && pageArray.map((item, i) => (
                            <button type='button' className={item == currentPage ? 'button-current' : ''} value={item} onClick={(e) => setCurrentPage(e.target.value)}>{item}</button>
                            ))
                        ) : (
                            <></>
                        )
                    }
                    </div>

                    <Footer />
                </>
            )}
        </>
    )
}

export default SameCategory