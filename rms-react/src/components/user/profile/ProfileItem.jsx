import React, { useEffect, useState } from 'react'
import sampleIcon from '../../../assets/images/default.png'
import axios from 'axios'
import { fetchApiData, storeApiData } from '../../../api/api'
import ProfileApplied from './ProfileApplied'
import Loader from '../../../services/Loader'

const openCVInput = () => {
    let cvInput = document.getElementById('changeCV')
    let btnChange = document.getElementById('btnChange')
    let btnCancel = document.getElementById('btnCancel')
    
    cvInput.style.display = 'block';
    btnCancel.style.display = 'block';
    btnChange.style.display = 'none';
}
const closeCVInput = () => {
    let cvInput = document.getElementById('changeCV')
    let btnChange = document.getElementById('btnChange')
    let btnCancel = document.getElementById('btnCancel')

    cvInput.style.display = 'none';
    btnChange.style.display = 'block';
    btnCancel.style.display = 'none';
}

const ProfileItem = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)

    const [categoryData, setCategoryData] = useState([])
    const [userData, setUserData] = useState('')
    const [profileData, setProfileData] = useState('')

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(0)
    const [address, setAddress] = useState('')
    const [lastEducation, setLastEducation] = useState('')
    const [dreamJob, setDreamJob] = useState('')
    const [status, setStatus] = useState('')
    const [documentUrl, setDocumentUrl] = useState('')

    const [document, setDocument] = useState(null)

    const fetchCategory = async () => {
        const response = await fetchApiData('categories')
        setCategoryData(response.data.categories.data)
    }

    const checkProfile = async () => {
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
    
    const getCompleteProfile = async () => {
        if (userData) {
            const response = await fetchApiData(`user-complete-profile/${userData.id}`);
            if (response && response.status && response.status === true) {
                setProfileData(response.data.profile);
            }else {
                console.log(response);
            }
        }
    };

    const setProfile = () => {
        if (profileData && userData && categoryData) {
            setFullname(profileData.fullname)
            setEmail(userData.email)
            setAge(profileData.age)
            setAddress(profileData.address)
            setLastEducation(profileData.last_education)
            setDreamJob(profileData.dream_job)
            setStatus(profileData.status)
            setDocumentUrl(profileData.document_url)
            
            // if (profileData.dream_job !== null) {
                // setDreamJob(categoryData[profileData.dream_job-1].name)
            // }
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    useEffect(() => {
        if (!userData) {
            checkProfile();
        }
    }, []);
    
    useEffect(() => {
        checkVerify();
        getCompleteProfile();
    }, [userData]);

    useEffect(() => {
        setProfile()
        setTimeout(() => {
            setLoader(false);
        }, 3000);
    }, [profileData])

    // console.log(profileData)
    // console.log(userData)
    // console.log(categoryData)
    // console.log(dreamJob)
    // console.log(profileData.dream_job)

    const requestChanges = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('age', age)
        formData.append('address', address)
        formData.append('lastEducation', lastEducation)
        formData.append('dreamJob', dreamJob)
        formData.append('status', status)
        formData.append('file', document)

        try {
            const response = await axios.post(`http://localhost:8000/changeProfile/${profileData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })

            console.log('tes')
            console.log(response.data)
            setDoRefresh(!doRefresh)
        } catch (error) {
            console.log('error');
        }
    }

    const requestChange = async () => {
        await storeApiData(`changeProfile/${profileData.id}`, { fullname, email, age, address, lastEducation, dreamJob, status })
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
    }

    const applyChangesHandler = (e) => {
        requestChanges(e)
    }

    const [allAppliedJobs, setAllAppliedJobs] = useState([])

    const fetchAllAppliedJobs = async () => {
        const response = await fetchApiData(`getAppliedJobs/${profileData.id}`)
        setAllAppliedJobs(response?.data.jobApplication)
    }
    
    useEffect(() => {
        if (profileData) {
            fetchAllAppliedJobs()
        }
    }, [profileData])

    // console.log(allAppliedJobs)
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
                    <Loader />
                ) : (
                    <>
                        <section className='profile'>
            <div className="container">
                <div className="configure-div">
                    <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="fullname">Fullname: </label>
                                <input type="text" className='form-control' name="fullname" placeholder='fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='user email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="age">Age: </label>
                                <input type="number" className='form-control' name="age" placeholder='user age' value={age} onChange={(e) => setAge(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="address">Address: </label>
                                <input type="text" className='form-control' name="address" placeholder='user address' value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="lastEducation">Last Education: </label>
                                <select className='form-control' value={lastEducation} onChange={(e)=>setLastEducation(e.target.value)}>
                                    <option value=''>Select an option</option>
                                    <option value='S3'>S3</option>
                                    <option value='S2'>S2</option>
                                    <option value='S1'>S1</option>
                                    <option value='SMA/Sederajat'>SMA/Sederajat</option>
                                    <option value='SMP/Sederajat'>SMP/Sederajat</option>
                                    <option value='SD/Sederajat'>SD/Sederajat</option>
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="dreamJob">Dream Job: </label>
                                <select className='form-control' value={dreamJob} onChange={(e)=>setDreamJob(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    {
                                        categoryData.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={status} onChange={(e)=>setStatus(e.target.value)}>
                                    <option value='unemploye'>Unemploye</option>
                                    <option value='employed'>Employed</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label htmlFor="document">CV: </label>
                                <div className='form-column-row'>
                                    <a href={documentUrl}>View your CV</a>
                                    <button type='button' id='btnChange' onClick={openCVInput}>Change CV</button>
                                    <button type='button' id='btnCancel' onClick={closeCVInput}>Cancel</button>
                                    <input id='changeCV' type='file' onChange={(e) => setDocument(e.target.files[0])} className='form-control' name='document' placeholder='Change CV'></input>
                                </div>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={applyChangesHandler}>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Apply Changes</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="job-applied-div">
                    <div className="info">
                        <h1>Applied Job</h1>
                    </div>
                    <>
                        <ProfileApplied allAppliedJobs = {allAppliedJobs} document_url={documentUrl} />
                    </>
                </div>
            </div>
        </section>
                    </>
                )
            }
        </>
    )
}

export default ProfileItem