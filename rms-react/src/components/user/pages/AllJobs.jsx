import React, { useEffect, useState } from 'react'
import Loader from '../../../services/Loader';
import NavBar from './navigation/NavBar';
import JobItemSection from './JobItemSection';
import Footer from '../footer/Footer';
import { fetchApiData, storeApiData } from '../../../api/api';
import axios from 'axios';

const AllJobs = () => {
    // const [counter, setCounter] = useState(6)
    const [loader, setLoader] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [jobCount, setJobCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    // const [totalPageArray, setTotalPageArray] = useState([])
    const totalPageArray = []
    const [pageArray, setPageArray] = useState([])
    const [user, setUser] = useState([]);

    const [currentFilterPage, setCurrentFilterPage] = useState(1)

    // const handleClick = () => {
    //     setCounter(counter + 6);
        
    //     const fetchData = async () => {
    //         const response = await fetchApiData(`home/browse/${counter}`);
    //         if (response.status===true) {
    //             setJobs(response.data);
    //         }else {
    //             console.log(response);
    //         }
    //     }
    //     fetchData();
    // }

    // let count = 6;
    // const [loader, setLoader] = useState(true);
    // const [jobs, setJobs] = useState([]);

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

    // console.log(user)

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
            const response = await storeApiData(`home/browseJobs/${currentPage}`, formData);
            if (response.data) {
                setJobs(response.data.jobs)
                setTotalPage(response.data.totalPage)
                // setCurrentPage(response.data.currentPage)
                setJobCount(response.data.jobCount)
            }
        }
        // clearFilter()
        setSearchJobs([])
        setTitle('')
        setLocation('')
        checkUser()
        // const fetchData = async () => {
        //     if ( user !== 'no') {
        //         const formData = new FormData();
        //         formData.append('user_id', user.id);
        //         const response = await storeApiData(`home/browseJobs/${currentPage}`, formData)
        //         if (response.data) {
        //             setJobs(response.data.jobs)
        //             setTotalPage(response.data.totalPage)
        //             setCurrentPage(response.data.currentPage)
        //         }
        //     }
        // }
    }, [user, currentPage])

    useEffect(() => {
        // const fetchData = async () => {
            // if (user) {
            //     const formData = new FormData();
            //     formData.append('user_id', user.id);
            //     const response = await storeApiData(`home/browseJobs/${currentPage}`, { formData });
            //     if (response.data) {
            //         setJobs(response.data.jobs)
            //         setTotalPage(response.data.totalPage)
            //         setCurrentPage(response.data.currentPage)
            //     }
            // }else {
            //     const response = await storeApiData(`home/browseJobs/${currentPage}`);
            //     if (response.data) {
            //         setJobs(response.data.jobs)
            //         setTotalPage(response.data.totalPage)
            //         setCurrentPage(response.data.currentPage)
            //         // console.log(response.data)
            //     }
            // }
            // if (response.status===true) {
            //     setJobs(response.data);
            // }else {
            //     // console.log(response);
            // }
        // }
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
    // }, [currentPage]);

    // const [categoryData, setCategoryData] = useState([])

    // const fetchCategory = async () => {
    //     const categoryResponse = await fetchApiData(`loadCategory`)
    //     setCategoryData(categoryResponse.data.category)
    // }

    // console.log(categoryData)

    const [title, setTitle] = useState('')
    // const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    // const [type, setType] = useState('')

    // console.log(jobs)

    const [searchJobs, setSearchJobs] = useState([])

    const fetchSearchJobs = async (page) => {
        // setCurrentFilterPage(1)
        // console.log(page
        if (!Number(page)) {
            page = 1;
        }

        // console.log(page)
        const formData = new FormData();
        formData.append('title', title)
        formData.append('location', location)
        formData.append('user_id', user?.id)

        const response = await storeApiData(`filterJobs/${page}`, formData)
        if (response.data) {
            setSearchJobs(response.data.jobs)
            setJobCount(response.data.jobCount)
            setTotalPage(response.data.totalPage)
            // setCurrentFilterPage(response.data.currentPage)
        }
    //     const response = await storeApiData(`filterJobs/${counter}`, {title, category, location, type})
    //     setSearchJobs(response.data.job)

        // console.log(title)
        // console.log(category)
        // console.log(location)
        // console.log(type)
    }

    // console.log(searchJobs)

    useEffect(() => {
        if (jobs.length > 0) {
            // console.log('search')
            fetchSearchJobs(currentFilterPage)
        }
    }, [currentFilterPage])

    const clearFilter = () => {
        setSearchJobs([])
        setTitle('')
        // setCategory('')
        setLocation('')
        setCurrentPage(1)
        // setType('')
    }

    // console.log(jobs)
    // console.log(searchJobs)

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
                        <div className='searchContainer'>
                            <div className='searchRow'>
                                <label htmlFor="">Job Title: </label>
                                <input type='text' name='title' value={title} onChange={(e)=>setTitle(e.target.value)} className='textSearch' placeholder='Developer, Designer, etc...'/>
                            </div>
                            {/* <div className="searchRow">
                                <label htmlFor="">Category: </label>
                                <select className='dropdownSearch' value={category} onChange={(e)=>setCategory(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    <option value='all'>All Category</option>
                                    {
                                        categoryData && categoryData.map((item, i) => (
                                            <option key={item.id} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div> */}
                            <div className="searchRow">
                                <label htmlFor="">Job Location: </label>
                                <input type='text' name='location' value={location} onChange={(e)=>setLocation(e.target.value)} className='textSearch' placeholder='Sidoarjo, Bandung, etc...'/>
                            </div>
                            {/* <div className="searchRow">
                                <label htmlFor="">Type: </label>
                                <select className='dropdownSearch' value={type} onChange={(e)=>setType(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    <option value='all'>All Types</option>
                                    <option value='full time'>Full Time</option>
                                    <option value='part time'>Part Time</option>
                                </select>
                            </div> */}
                            <button className='btnApplyFilter' type='button' onClick={fetchSearchJobs} >Search</button>
                            <button className='btnClearFilter' type='button' onClick={clearFilter} >Clear Filter</button>
                        </div>
                        {/* <p>{jobCount} jobs</p> */}
                        {
                            searchJobs && searchJobs.length > 0 ? (
                                <p className='filterPageMsg'>Page {currentFilterPage} of {totalPage} with total of {jobCount} jobs</p>
                            ) : (
                                <p className='normalPageMsg'>Page {currentPage} of {totalPage} with total of {jobCount} jobs</p>
                            )
                        }
                        {/* <p>Page {currentPage} of {totalPage} with total of {jobCount} jobs</p> */}
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
                                    {/* <JobItemSection jobs={searchJobs} /> */}
                                </>
                            ) : (

                                jobs && jobs === 'Nothing' ? (
                                    <>
                                        <p>No Jobs</p>
                                    </>
                                ) : (
                                    <>
                                        <JobItemSection jobs={jobs} condition='pages' />
                                    </>
                                )
                            )
                        }

                        {/* {
                            pageArray && pageArray.map((item, i) => (
                                <button type='button' value={item} onClick={(e) => setCurrentPage(e.target.value)}>{item}</button>
                            ))
                        } */}
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

                        {
                            searchJobs && searchJobs.length > 0 ? (
                                <>
                                
                                </>
                            ) : (
                                <>
                                    {/* <div className="load-data">
                                        <button className='button' onClick={handleClick}>Browse More</button>
                                    </div> */}
                                </>
                            )
                        }
                        <Footer />
                    </>
                ))
            }
        </>
    );
};

export default AllJobs