import React, { useEffect, useState } from 'react'
import Loader from '../../../services/Loader';
import NavBar from './navigation/NavBar';
import JobItemSection from './JobItemSection';
import Footer from '../footer/Footer';
import { fetchApiData, storeApiData } from '../../../api/api';
import axios from 'axios';

const AllJobs = () => {
    const [loader, setLoader] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const totalPageArray = []
    const [pageArray, setPageArray] = useState([])
    const [user, setUser] = useState([]);

    const [currentFilterPage, setCurrentFilterPage] = useState(1)

    useEffect(() => {
        const fillData = () => {
            for (let i = 1; i <= totalPage; i++) {
                totalPageArray.push(i)
            }
        }

        fillData()
        setPageArray(totalPageArray)
    }, [totalPage])

    const checkUser = () => {
        if (user !== 'no') {
            const formData = new FormData();
            formData.append('user_id', user.id);
            
            fetchData(formData)
        }else {
            fetchData(null)
        }
    }

    const fetchData = async (formData) => {
        const response = await storeApiData(`home/browseJobs/${currentPage}`, formData);
        if (response.data) {
            setJobs(response.data.jobs)
            setTotalPage(response.data.totalPage)
            setJobCount(response.data.jobCount)
        }
    }

    useEffect(() => {
        setSearchJobs([])
        setTitle('')
        setLocation('')
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
        setTimeout(() => {
            setLoader(false);
        }, 4000)
    }, [currentPage]);

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')

    const [searchJobs, setSearchJobs] = useState([])

    const fetchSearchJobs = async (page) => {
        if (!Number(page)) {
            page = 1;
        }

        const formData = new FormData();
        formData.append('title', title)
        formData.append('location', location)
        formData.append('user_id', user?.id)

        const response = await storeApiData(`filterJobs/${page}`, formData)
        if (response.data) {
            setSearchJobs(response.data.jobs)
            setJobCount(response.data.jobCount)
            setTotalPage(response.data.totalPage)
        }
    }

    useEffect(() => {
        if (jobs.length > 0) {
            fetchSearchJobs(currentFilterPage)
        }
    }, [currentFilterPage])

    const clearFilter = () => {
        setSearchJobs([])
        setTitle('')
        setLocation('')
        setCurrentPage(1)
        checkUser()
    }

    return (
        <>
            {
                (loader && <Loader /> || (
                    <>
                        <NavBar hero='jobs' cmp="jobs" />
                        <div className='searchContainer'>
                            <div className='searchRow'>
                                <label htmlFor="">Job Title: </label>
                                <input type='text' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} className='textSearch' placeholder='Developer, Designer, etc...'/>
                            </div>
                            <div className="searchRow">
                                <label htmlFor="">Job Location: </label>
                                <input type='text' name='location' value={location} onChange={(e)=>setLocation(e.target.value)} className='textSearch' placeholder='Sidoarjo, Bandung, etc...'/>
                            </div>
                            <button className='btnApplyFilter' type='button' onClick={fetchSearchJobs} >Search</button>
                            <button className='btnClearFilter' type='button' onClick={clearFilter} >Clear Filter</button>
                        </div>
                        {
                            searchJobs && searchJobs === 'Nothing' ? (
                                <></>
                            ) : (
                                searchJobs && searchJobs.length > 0 ? (
                                    <p className='filterPageMsg'>Page {currentFilterPage} of {totalPage} with total of {jobCount} jobs</p>
                                ) : (
                                    jobs && jobs !== 'Nothing' ? (
                                        <p className='normalPageMsg'>Page {currentPage} of {totalPage} with total of {jobCount} jobs</p>
                                    ) : (
                                        <></>
                                    )
                                )
                            )
                        }
                        {
                            searchJobs && searchJobs.length > 0 ? (
                                <>
                                    <h1 className='search-mark'>Search Result: </h1>
                                    {
                                        searchJobs == "Nothing" ? (
                                            <>
                                                <h1 className='search-empty'>{searchJobs}</h1>
                                            </>
                                        ) : (
                                            <>
                                                <JobItemSection jobs={searchJobs} condition='search' />
                                            </>
                                        )
                                    }
                                </>
                            ) : (

                                jobs && jobs === 'Nothing' ? (
                                    <>
                                        <h1 className='search-empty'>There are no jobs</h1>
                                    </>
                                ) : (
                                    <>
                                        <JobItemSection jobs={jobs} condition='pages' />
                                    </>
                                )
                            )
                        }
                        <div className="page__wrapper">
                        {
                            searchJobs && searchJobs.length > 0 ? (
                                pageArray && pageArray.map((item, i) => (
                                    <button type='button' className={item == currentFilterPage ? 'button-current' : ''} value={item} onClick={(e) => setCurrentFilterPage(e.target.value)}>{item}</button>
                                ))
                            ) : (
                                pageArray && pageArray.map((item, i) => (
                                    <button type='button' className={item == currentPage ? 'button-current' : ''} value={item} onClick={(e) => setCurrentPage(e.target.value)}>{item}</button>
                                ))
                            )
                        }
                        </div>
                        <Footer />
                    </>
                ))
            }
        </>
    );
};

export default AllJobs