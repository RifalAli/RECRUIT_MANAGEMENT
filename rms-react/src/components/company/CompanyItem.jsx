import React, { useEffect, useState } from 'react'
import sampleIcon from '../../assets/images/default.png'
import CompanyJob from './CompanyJob';
import axios from 'axios';
import { fetchApiData, storeApiData } from '../../api/api';
import CompanyApplier from './CompanyApplier';
import Loader from '../../services/Loader';
import CompanyBlacklist from './CompanyBlacklist';

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
    const [errMsg, setErrMsg] = useState('')
    //Close Modal is going to clean the form
    const closeModal = () => {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display = 'none';
    
        setJobTitle('')
        setJobCloseDate('')
        setJobSalary('')
        setJobDescription('')
        setJobCategory('')
        setJobType('')
    }

    //Company Profile
    const [userData, setUserData] = useState('')
    const [companyData, setCompanyData] = useState('')

    const [username, setUsername] = useState('')
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

    const checkVerify = () => {
        if (userData.verify === 0) {
            window.location = '/verify';
        }
    }

    const getCompleteCompany = async () => {
        if (userData) {
            const response = await fetchApiData(`user-complete-company/${userData.id}`);
            if (response && response.status && response.status === true) {
                setCompanyData(response.data.company);
            }else {
                // console.log(response);
            }
        }
    };

    const setCompany = () => {
        if (companyData && userData) {
            setUsername(userData.name)
            setName(companyData.name)
            setEmail(userData.email)
            setLocation(companyData.location)
            setDescription(companyData.description)

            revalidateCompany()
        }

    }

    const revalidateCompany = () => {
        if (!userData.name || !companyData.name || !userData.email || !companyData.location || !companyData.description) {
            console.log('a')
            console.log(userData.name, companyData.name, userData.email, companyData.location, companyData.description)
            return setErrMsg('Please complete your company profile in order to publish any job vacant');
        }
    }

    useEffect(() => {
        if (!userData) {
            checkCompany();
        }
    });

    useEffect(() => {
        checkVerify();
        getCompleteCompany();
    }, [userData]);

    useEffect(() => {
        console.log(companyData)
        setCompany()
        setTimeout(() => {
            setLoader(false);
        }, 3500);
    }, [companyData])

    // console.log(companyData)
    // console.log(userData)

    const requestChanges = async () => {
        await storeApiData(`changeCompany/${companyData.id}`, { username, name, location, email, description })
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
    }

    const applyChangesHandler = () => {
        setErrMsg('')
        if (!username || !name || !email || !location || !description) {
            return setErrMsg('Please fill all field to make any changes');
        }

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
    const [jobSalary, setJobSalary] = useState('')
    const [jobCloseDate, setJobCloseDate] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobType, setJobType] = useState('full time');
    const [jobCategory, setJobCategory] = useState('');

    const [jobErrMsg, setJobErrMsg] = useState('')
    const [jobResponse, setJobResponse] = useState('');

    const postJob = () => {
        setJobErrMsg('')
        const validation = () => {
            if (!jobTitle || !jobSalary || !jobCloseDate || !jobDescription || !jobType || !jobCategory) {
                return setJobErrMsg('Please fill all field before post this job')
            }

            createJob()
        }

        const createJob = async () => {
            await storeApiData(`companyCreateJob/${companyData.id}`, { jobTitle, jobSalary, jobCloseDate, jobCategory, jobDescription, jobType })
            .then((response) => { setJobResponse(response) })
            .catch((response) => { console.log(response) })
        }
        setJobResponse('')
        validation()
        // const createJob = async () => {
        //     await storeApiData(`companyCreateJob/${companyData.id}`, { jobTitle, jobSalary, jobCloseDate, jobCategory, jobDescription, jobType })
        //     .then((response)=>console.log(response.data))
        //     .then(setDoRefresh(!doRefresh))
        //     .catch((response)=>console.log(response.data))
        // }

        // createJob()
        // closeModal()
    }

    useEffect(() => {
        const moreValidation = () => {
            if (jobResponse === 'Empty profile') {
                return setJobErrMsg('Cannot post this job because your company profile is not filled yet')
            }else if (jobResponse.data) {
                closeModal()
                setDoRefresh(!doRefresh)
            }

        }

        moreValidation()
    }, [jobResponse])

    //Fetch Job
    const [allJobs, setAllJobs] = useState([])
    const [jobCount, setJobCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const totalPageArray = []
    const [pageArray, setPageArray] = useState([])

    // const fetchAllJobs = async () => {
    //     const response = await fetchApiData(`getCompanyJob/${companyData.id}`)
    //     setAllJobs(response.data.job)
    // }

    const fetchJobs = async () => {
        await fetchApiData(`getCompanyJob/${companyData.id}/${currentPage}`)
        .then((response) => { setAllJobs(response.data.job); setTotalPage(response.data.totalPage); setJobCount(response.data.jobCount) })
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
    
    //Fetch Applier
    const [allAppliers, setAllAppliers] = useState([])

    const fetchAllAppliers = async () => {
        const response = await fetchApiData(`companyViewApplier/${companyData.id}`)
        setAllAppliers(response.data.applier)
    }
    
    useEffect(() => {
        if (companyData) {
            // fetchAllJobs()
            fetchJobs()
        }
    }, [companyData, currentPage])

    useEffect(() => {
        if (companyData) {
            fetchAllAppliers()
        }
    }, [companyData])

    // console.log(allJobs)
    // console.log(allAppliers)

    const logout = () => {
        localStorage.clear();
        window.location = '/login';
    }

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
                                <label htmlFor="name">Username: </label>
                                <input type="text" className='form-control' name="name" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="name">Company Name: </label>
                                <input type="text" className='form-control' name="name" placeholder='Company name' value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="location">Location: </label>
                                <input type="text" className='form-control' name="location" placeholder='Company location' value={location} onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='company email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="address" placeholder='company description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div> */}
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Company Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <p className='auth-error'>{errMsg}</p>
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
                <div className='blacklist-company-div'>
                    <CompanyBlacklist company_id={userData.id} user_id={userData.id} />
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
                        {
                            allJobs && allJobs === 'Nothing' ? (
                                <></>
                            ) : (
                                <p className='pageMsg'>Page {currentPage} of {totalPage} with total of {jobCount} jobs</p>
                            )
                        }
                        <CompanyJob allJobs={allJobs} category={category} />
                        {/* <JobItem title='Check' slug='a' type='full time' company='PT Tes' icon='http://localhost:8000/files/jobs/default.png'/> */}
                        {/* <FeaturedJobItem title='Check' slug='a' type='full time' company='PT Tes' icon='http://localhost:8000/files/jobs/default.png'/> */}
                        <div className='page__wrapper'>
                        {
                            pageArray && pageArray.map((item, i) => (
                                <button type='button' className={item == currentPage ? 'button-current' : ''} value={item} onClick={(e) => setCurrentPage(e.target.value)}>{item}</button>
                            ))
                        }
                        </div>
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

                <button className='btn-logout button' type='button' onClick={logout}>LOGOUT</button>
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
                                <label htmlFor="salary">Salary: </label>
                                <input type="text" className='form-control' name="salary" placeholder='Job Salary' value={jobSalary} onChange={(e) => setJobSalary(e.target.value)}/>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="expire_at">Close Date: </label>
                                <input type="date" className='form-control' name="expire_at" placeholder='close date' value={jobCloseDate} onChange={(e) => setJobCloseDate(e.target.value)}/>
                            </div> */}
                            <div className='form-row'>
                                <label htmlFor="expire_at">Expire at: </label>
                                <input type="datetime-local" className='form-control' name="expire_at" placeholder='close date' value={jobCloseDate} onChange={(e) => setJobCloseDate(e.target.value)}/>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="address" placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
                            </div> */}
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
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
                                </select>
                            </div>
                            <p className='auth-error'>{jobErrMsg}</p>
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