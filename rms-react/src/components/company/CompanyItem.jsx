import React, { useEffect, useState } from 'react'
import sampleIcon from '../../assets/images/default.png'
import CompanyJob from './CompanyJob';
import axios from 'axios';
import { fetchApiData, storeApiData } from '../../api/api';
import CompanyApplier from './CompanyApplier';
import Loader from '../../services/Loader';

const openModal = () => {
    let modal = document.getElementsByClassName('modal')[0];
    modal.style.display = 'block';
}

// const closeModal = () => {
//     let modal = document.getElementsByClassName('modal')[0];
//     modal.style.display = 'none';

//     setJobTitle('')
// }

const CompanyItem = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)
    //Close Modal is going to clean the form
    const closeModal = () => {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display = 'none';
    
        setJobTitle('')
        setJobTag('')
        setJobCount('')
        setJobCloseDate('')
        setJobSalary('')
        setJobDescription('')
        setJobCategory('')
        setJobType('')
    }

    //Company Profile
    const [userData, setUserData] = useState('')
    const [companyData, setCompanyData] = useState('')

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    const checkCompany = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/user-profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            });
            setUserData(response.data.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const getCompleteCompany = async () => {
        if (userData) {
            const response = await fetchApiData(`user-complete-company/${userData.id}`);
            if (response && response.status && response.status === true) {
                setCompanyData(response.data.company);
            }else {
                console.log(response);
            }
        }
    };

    const setCompany = () => {
        if (companyData && userData) {
            setName(companyData.name)
            setEmail(userData.email)
            setLocation(companyData.location)
            setDescription(companyData.description)
        }
    }

    useEffect(() => {
        if (!userData) {
            checkCompany();
        }
    });

    useEffect(() => {
        getCompleteCompany();
    }, [userData]);

    useEffect(() => {
        setCompany()
        setTimeout(() => {
            setLoader(false);
        }, 3500);
    }, [companyData])

    console.log(companyData)
    console.log(userData)

    const requestChanges = async () => {
        await storeApiData(`changeCompany/${companyData.id}`, { name, location, email, description })
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
    }

    const applyChangesHandler = () => {
        requestChanges()
    }

    //Fetch Category
    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        const response = await fetchApiData('categories')
        setCategory(response.data.categories.data)
    }

    useEffect(() => {
        if (category.length < 1) {
            fetchCategory();
        }
    }, [])


    console.log(category)

    //Add Job
    const [jobTitle, setJobTitle] = useState('')
    const [jobTag, setJobTag] = useState('')
    const [jobCount, setJobCount] = useState('')
    const [jobSalary, setJobSalary] = useState('')
    const [jobCloseDate, setJobCloseDate] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobType, setJobType] = useState('full time');
    const [jobCategory, setJobCategory] = useState('');

    const postJob = () => {
        const createJob = async () => {
            await storeApiData(`companyCreateJob/${companyData.id}`, { jobTitle, jobCount, jobTag, jobSalary, jobCloseDate, jobCategory, jobDescription, jobType })
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }

        createJob()
        closeModal()
    }

    //Fetch Job
    const [allJobs, setAllJobs] = useState([])

    const fetchAllJobs = async () => {
        const response = await fetchApiData(`getCompanyJob/${companyData.id}`)
        setAllJobs(response.data.job)
    }
    
    //Fetch Applier
    const [allAppliers, setAllAppliers] = useState([])

    const fetchAllAppliers = async () => {
        const response = await fetchApiData(`companyViewApplier/${companyData.id}`)
        setAllAppliers(response.data.applier)
    }
    
    useEffect(() => {
        if (companyData) {
            fetchAllJobs()
        }
    }, [companyData])

    useEffect(() => {
        if (companyData) {
            fetchAllAppliers()
        }
    }, [companyData])

    console.log(allJobs)
    console.log(allAppliers)

    useEffect(() => {
        if (doRefresh) {
            setTimeout(() => {
                window.location.reload()
                setDoRefresh(!doRefresh)
            }, 2000)
        }

    }, [doRefresh])

    return (
        <>
            {
                loader ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>
                    <section className='company'>
            <div className="container">
                <div className="configure-profile-div">
                    <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="name">Name: </label>
                                <input type="text" className='form-control' name="name" placeholder='company name' value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="location">Location: </label>
                                <input type="text" className='form-control' name="location" placeholder='company location' value={location} onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='company email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="address" placeholder='company description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className='button-div'>
                                <button className="button" onClick={applyChangesHandler} type='button'>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Apply Changes</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='job-profile-div'>
                    <div className="info">
                        <h1>Job</h1>
                        <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                {/* <img src='' alt='' height='15px' width='15px'/> */}
                                <span>Add Job</span>
                            </div>
                        </button>
                        </div>
                    </div>
                    {/* Job that belong to this company are here */}
                    <>
                        <CompanyJob allJobs={allJobs} category={category} />
                        {/* <JobItem title='Check' slug='a' type='full time' company='PT Tes' icon='http://localhost:8000/files/jobs/default.png'/> */}
                        {/* <FeaturedJobItem title='Check' slug='a' type='full time' company='PT Tes' icon='http://localhost:8000/files/jobs/default.png'/> */}
                    </>
                </div>
                <div className="job-applier-div">
                    <div className="info">
                        <h1>Job Applier</h1>
                    </div>
                    <>
                        {/* <CompanyJob allJobs={allJobs} category={category} /> */}
                        <CompanyApplier allAppliers={allAppliers} />
                    </>
                </div>
            </div>

            <div className="modal">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="title">Title: </label>
                                <input type="text" className='form-control' name="title" placeholder='Job Title' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="tag">Tag: </label>
                                <input type="text" className='form-control' name="tag" placeholder='Job Tag' value={jobTag} onChange={(e) => setJobTag(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="count">Count: </label>
                                <input type="number" className='form-control' name="count"  placeholder='People Needed' value={jobCount} onChange={(e) => setJobCount(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="salary">Salary: </label>
                                <input type="text" className='form-control' name="salary" placeholder='Job Salary' value={jobSalary} onChange={(e) => setJobSalary(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="close_date">Close Date: </label>
                                <input type="date" className='form-control' name="close_date" placeholder='close date' value={jobCloseDate} onChange={(e) => setJobCloseDate(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="address" placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="category">Category: </label>
                                <select className='form-control' value={jobCategory} onChange={(e)=>setJobCategory(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    {
                                        // category.map((item) => (
                                        //     <option key={item.id} value={item.name}>{item.name}</option>
                                        // ))
                                        category.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                        // reamData.map(item => {
                                        //     <option key={item.id} value={item.name}>{item.name}</option>
                                        // })
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="type">Type: </label>
                                <select className='form-control' value={jobType} onChange={(e)=>setJobType(e.target.value)}>
                                    <option value='full time'>full time</option>
                                    <option value='part time'>part time</option>
                                    <option value='half time'>half time</option>
                                </select>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={postJob}>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Post Job</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeModal} className="button button-cancel">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
                    </>
                )
            }
        </>
    )
}

export default CompanyItem