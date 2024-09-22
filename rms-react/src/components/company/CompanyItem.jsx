import React, { useEffect, useState } from 'react'
import sampleIcon from '../../assets/images/default.png'
import CompanyJob from './CompanyJob';
import axios from 'axios';
import { fetchApiData, storeApiData } from '../../api/api';
import CompanyApplier from './CompanyApplier';
import Loader from '../../services/Loader';
import CompanyBlacklist from './CompanyBlacklist';
import CompanyApplierItem from './CompanyApplierItem';

const openModal = () => {
    let modal = document.getElementsByClassName('job-modal')[0];
    modal.style.display = 'block';
}

const openBan = () => {
    let modal = document.getElementsByClassName('ban-modal')[0];
    modal.style.display = 'block';
}

const showLogoutModal = () => {
    let modal = document.getElementsByClassName('logout-modal')[0];

    modal.style.display = 'block';
}

const closeLogoutModal = () => {
    let modal = document.getElementsByClassName('logout-modal')[0];

    modal.style.display = 'none';
}

const openArchiveModal = () => {
    let modal = document.getElementsByClassName('archive-modal')[0];

    modal.style.display = 'block';
}

const closeArchiveModal = () => {
    let modal = document.getElementsByClassName('archive-modal')[0];

    modal.style.display = 'none';
}

const CompanyItem = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const closeModal = () => {
        let modal = document.getElementsByClassName('job-modal')[0];
        modal.style.display = 'none';
    
        setJobTitle('')
        setJobCloseDate('')
        setJobSalary('')
        setJobDescription('')
        setJobCategory('')
        setJobType('')
    }

    const [userData, setUserData] = useState('')
    const [companyData, setCompanyData] = useState('')

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('');

    const [image, setImage] = useState(null);

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
            setImageUrl(userData.image)

            revalidateCompany()
        }

    }

    const revalidateCompany = () => {
        if (!userData.name || !companyData.name || !userData.email || !companyData.location || !companyData.description) {
            console.log(userData.name, companyData.name, userData.email, companyData.location, companyData.description)
            return setErrMsg('Please complete your company profile in order to publish any job vacant');
        }

        checkBanned()
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

    const requestChanges = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('location', location)
        formData.append('description', description)
        formData.append('image', image)

        await storeApiData(`changeCompany/${companyData.id}`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
    }

    const applyChangesHandler = (e) => {
        setErrMsg('')
        if (!username || !name || !email || !location || !description) {
            return setErrMsg('Please fill all field to make any changes');
        }

        requestChanges(e)
    }

    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        const response = await fetchApiData('allCategories')
        setCategory(response.data.categories)
    }

    useEffect(() => {
        if (category.length < 1) {
            fetchCategory();
        }
    }, [])


    console.log(category)

    const [jobTitle, setJobTitle] = useState('')
    const [jobSalary, setJobSalary] = useState('')
    const [jobCloseDate, setJobCloseDate] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobType, setJobType] = useState('full time');
    const [jobCategory, setJobCategory] = useState('');
    const [jobImageUrl, setJobImageUrl] = useState('');

    const [jobImage, setJobImage] = useState(null)

    const [jobErrMsg, setJobErrMsg] = useState('')
    const [jobResponse, setJobResponse] = useState('');

    const postJob = (e) => {
        setJobErrMsg('')
        const validation = () => {
            if (!jobTitle || !jobSalary || !jobCloseDate || !jobDescription || !jobType || !jobCategory) {
                console.log(jobTitle, jobSalary, jobCloseDate, jobDescription, jobType, jobCategory)
                return setJobErrMsg('Please fill all field before post this job')
            }

            createJob(e)
        }

        const createJob = async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append('jobTitle', jobTitle)
            formData.append('jobSalary', jobSalary)
            formData.append('jobCloseDate', jobCloseDate)
            formData.append('jobCategory', jobCategory)
            formData.append('jobDescription', jobDescription)
            formData.append('jobType', jobType)
            formData.append('jobImage', jobImage)

            await storeApiData(`companyCreateJob/${companyData.id}`, formData)
            .then((response) => { setJobResponse(response) })
            .catch((response) => { console.log(response) })
        }
        setJobResponse('')
        validation()
    }

    useEffect(() => {
        const moreValidation = () => {
            if (jobResponse === 'Empty profile') {
                return setJobErrMsg('Cannot post this job because your company profile is not filled yet')
            }else if (jobResponse === 'Banned user') {
                closeModal()
                openBan()
                return;
            }else if (jobResponse.data) {
                closeModal()
                setDoRefresh(!doRefresh)
            }

        }

        moreValidation()
    }, [jobResponse])

    const [allJobs, setAllJobs] = useState([])
    const [jobCount, setJobCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const totalPageArray = []
    const [pageArray, setPageArray] = useState([])

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
        setPageArray(totalPageArray)
    }, [totalPage])
    
    const [allAppliers, setAllAppliers] = useState([])
    const [archivedAppliers, setArchivedAppliers] = useState([])

    const fetchAllAppliers = async () => {
        const response = await fetchApiData(`companyViewApplier/normal/${companyData.id}`)
        setAllAppliers(response.data.applier)
    }

    const fetchArchivedAppliers = async () => {
        const response = await fetchApiData(`companyViewApplier/archive/${companyData.id}`)
        setArchivedAppliers(response.data.applier)
    }

    const handleCloseArchiveModal = async () => {
        fetchAllAppliers();
        closeArchiveModal();
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

    const checkBanned = () => {
        setTimeout(() => {
            if (userData.isBanned == 1) {
                openBan()
            }
        }, 3000)
    }

    const archiveHandler = async () => {
        fetchArchivedAppliers();
        openArchiveModal();
    }

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
                        <img src={imageUrl} alt="sample" />
                        <input type='file' onChange={(e) => setImage(e.target.files[0])} className='btn-image-change'></input>
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
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Company Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <p className='auth-error'>{errMsg}</p>
                            <div className='button-div'>
                                <button className="button" onClick={applyChangesHandler} type='button'>
                                    <div>
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
                                <span>Add Job</span>
                            </div>
                        </button>
                        </div>
                    </div>
                    <>
                        {
                            allJobs && allJobs === 'Nothing' ? (
                                <></>
                            ) : (
                                <p className='pageMsg'>Page {currentPage} of {totalPage} with total of {jobCount} jobs</p>
                            )
                        }
                        <CompanyJob allJobs={allJobs} category={category} />
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
                        <button type='button' style={{ background: "#a9a9a9" }} onClick={archiveHandler} className="button">
                            <div>
                                <span>Archive Applier</span>
                            </div>
                        </button>
                    </div>
                    <>
                        <CompanyApplier applicationStatus='normal' allAppliers={allAppliers} fetchAllAppliers={fetchAllAppliers} fetchArchivedAppliers={fetchArchivedAppliers} />
                    </>
                </div>
                <div className='blacklist-company-div'>
                    <CompanyBlacklist company_id={userData.id} user_id={userData.id} />
                </div>
                <button className='btn-logout button' type='button' onClick={showLogoutModal}>LOGOUT</button>
            </div>

            <div className="modal job-modal">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                        <input type='file' onChange={(e) => setJobImage(e.target.files[0])} className='btn-image-change'></input>
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
                            <div className='form-row'>
                                <label htmlFor="expire_at">Expire at: </label>
                                <input type="datetime-local" className='form-control' name="expire_at" placeholder='close date' value={jobCloseDate} onChange={(e) => setJobCloseDate(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="category">Category: </label>
                                <select className='form-control' value={jobCategory} onChange={(e)=>setJobCategory(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    {
                                        category.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
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
                                        <span>Post Job</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeModal} className="button button-cancel">
                                    <div>
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal ban-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                        <h2 className="message">Your account has been banned</h2>
                        <p>Please contact our email to make an appeal</p>
                        <div className='button-div'>
                                <button type='button' onClick={logout} className="button">
                                    <div>
                                        <span>Ok</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal logout-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                            <h1>Are you sure want to logout?</h1>
                            <div className='button-div'>
                                <button type='button' onClick={logout} className="button">
                                    <div>
                                        <span>Logout</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeLogoutModal} className="button button-cancel">
                                    <div>
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="modal archive-modal">
                <button className="applier-detail-hide" type="button" onClick={handleCloseArchiveModal}>
                    <i className="fa fa-close fa-fw"></i>
                </button>
                <div className='modal-container'>
                    <div className="archive-container">
                        <CompanyApplier applicationStatus='archive' allAppliers={archivedAppliers} fetchAllAppliers={fetchAllAppliers} fetchArchivedAppliers={fetchArchivedAppliers} />
                    </div>
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