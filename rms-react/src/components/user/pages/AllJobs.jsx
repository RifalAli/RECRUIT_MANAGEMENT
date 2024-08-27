import React, { useEffect, useState } from 'react'
import Loader from '../../../services/Loader';
import NavBar from './navigation/NavBar';
import JobItemSection from './JobItemSection';
import Footer from '../footer/Footer';
import { fetchApiData, storeApiData } from '../../../api/api';

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
                // console.log(response);
            }
        }
        fetchData();
        fetchCategory()
        setTimeout(() => {
            setLoader(false);
        }, 700)
    }, [counter]);

    const [categoryData, setCategoryData] = useState([])

    const fetchCategory = async () => {
        const categoryResponse = await fetchApiData(`loadCategory`)
        setCategoryData(categoryResponse.data.category)
    }

    // console.log(categoryData)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')

    // console.log(jobs)

    const [searchJobs, setSearchJobs] = useState([])

    const fetchSearchJobs = async () => {
        const response = await storeApiData(`filterJobs/${counter}`, {title, category, location, type})
        setSearchJobs(response.data.job)

        // console.log(title)
        // console.log(category)
        // console.log(location)
        // console.log(type)
    }

    const clearFilter = () => {
        setSearchJobs([])
        setTitle('')
        setCategory('')
        setLocation('')
        setType('')
    }

    console.log(jobs.job)
    console.log(searchJobs)

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
                        {
                            searchJobs && searchJobs.length > 0 ? (
                                <>
                                    <h1 className='search-mark'>Search Result: </h1>
                                    {
                                        searchJobs == "Nothing Match" ? (
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
                                <>
                                    <JobItemSection jobs={jobs.job} condition='pages' />
                                </>
                            )
                        }


                        {
                            searchJobs && searchJobs.length > 0 ? (
                                <>
                                
                                </>
                            ) : (
                                <>
                                    <div className="load-data">
                                        <button className='button' onClick={handleClick}>Browse More</button>
                                    </div>
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