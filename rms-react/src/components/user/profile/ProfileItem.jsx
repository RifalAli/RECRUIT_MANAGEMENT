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

const openBan = () => {
    let modal = document.getElementsByClassName('ban-modal')[0]
    modal.style.display = 'block'
}

const openWarning = () => {
    let modal = document.getElementsByClassName('warning-modal')[0]
    modal.style.display = 'block'
}

const closeWarning = () => {
    let modal = document.getElementsByClassName('warning-modal')[0]
    modal.style.display = 'none'
}

const ProfileItem = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)

    // const [categoryData, setCategoryData] = useState([])
    const [userData, setUserData] = useState('')
    const [profileData, setProfileData] = useState('')

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [lastEducation, setLastEducation] = useState('')
    const [description, setDescription] = useState('')
    const [documentUrl, setDocumentUrl] = useState('')

    const [document, setDocument] = useState(null)

    const [errMsg, setErrMsg] = useState('');

    // const fetchCategory = async () => {
    //     const response = await fetchApiData('allCategories')
    //     setCategoryData(response.data.categories)
    // }

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

        // if (userData.isBanned === 1) {
        //     openBan();
        //     // console.log('a')
        // }
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
        if (profileData && userData) {
            setUsername(userData.name)
            setFullname(profileData.fullname)
            setEmail(userData.email)
            setAge(profileData.age)
            setAddress(profileData.address)
            setDescription(profileData.description)
            setLastEducation(profileData.last_education)
            setDocumentUrl(profileData.document_url)
            
            revalidateProfile()
            // if (profileData.dream_job !== null) {
                // setDreamJob(categoryData[profileData.dream_job-1].name)
            // }
        }
    }

    const revalidateProfile = async () => {
        // if (!userData.name && !profileData.fullname && !userData.email && !profileData.age && !ProfileApplied.address && !profileData.description && !profileData.lastEducation && !profileData.documentUrl) {
        //     // console.log('please complete your profile')
        //     console.log(username, fullname, email, age, address, description, lastEducation, documentUrl)
        //     return setErrMsg('Please complete your profile in order to apply for any job');
        // }

        if (!userData.name || !profileData.fullname || !userData.email || !profileData.age || !profileData.address || !profileData.description || !profileData.last_education) {
            // console.log('please complete your profile')
            // console.log(userData.name, profileData.fullname, userData.email, profileData.age, profileData.address, profileData.description, profileData.last_education, profileData.document_url)
            return setErrMsg('Please complete your profile in order to apply for any job');
        }
        
        if (!profileData.document_url) {
            return setErrMsg('You still did not add cv into your profile');
        }

        checkBanned()
    }

    // useEffect(() => {
    //     fetchCategory();
    // }, [])

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
        formData.append('name', username)
        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('age', age)
        formData.append('address', address)
        formData.append('description', description)
        formData.append('lastEducation', lastEducation)
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

    const logout = () => {
        localStorage.clear();
        window.location = '/login';
    }

    const requestChange = async () => {
        await storeApiData(`changeProfile/${profileData.id}`, { fullname, email, age, address, lastEducation })
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
    }

    const applyChangesHandler = (e) => {
        setErrMsg('')
        // if (!username && !fullname && !email && !age && !address && !description && !lastEducation) {
        //     return setErrMsg('Please fill all field to make any changes');
        // }
        if (!username || !fullname || !email || !age || !address || !description || !lastEducation) {
            return setErrMsg('Please fill all field to make any changes');
        }
        if (email === userData.email) {
            // console.log('Still Same')
            requestChanges(e)
        }else {
            openWarning()
        }
        // requestChanges(e)
    }

    const changeNow = (e) => {
        closeWarning()
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

    const checkBanned = () => {
        setTimeout(() => {
            if (userData.isBanned == 1) {
                openBan()
            }
        }, 3000)
    }

    // console.log(allAppliedJobs)
    useEffect(() => {
        if (doRefresh) {
            setTimeout(() => {
                window.location.reload()
                setDoRefresh(!doRefresh)
            }, 2000)
        }
    }, [doRefresh])

    // useEffect(() => {
    //     if (!doRefresh) {
    //         checkBanned()
    //     }
    // }, [doRefresh])
    
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
                                <label htmlFor="username">Username: </label>
                                <input type="text" className='form-control' name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='form-row'>
                                <label htmlFor="fullname">Fullname: </label>
                                <input type="text" className='form-control' name="fullname" placeholder='Fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="age">Age: </label>
                                <input type="number" className='form-control' name="age" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="address">Address: </label>
                                <input type="text" className='form-control' name="address" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="description" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div> */}
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
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
                            {/* <div className='form-row'>
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
                                    <option value='unemployed'>Unemployed</option>
                                    <option value='employed'>Employed</option>
                                </select>
                            </div> */}
                            <div className="form-row">
                                <label htmlFor="document">CV: </label>
                                <div className='form-column-row'>
                                    {
                                        documentUrl && documentUrl ? (
                                            <>
                                            <a href={documentUrl}>View your CV</a>
                                            <button type='button' id='btnChange' onClick={openCVInput}>Change CV</button>
                                            </>
                                        ) : (
                                            <button type='button' id='btnChange' onClick={openCVInput}>Add CV</button>
                                        )
                                    }
                                    <button type='button' id='btnCancel' onClick={closeCVInput}>Cancel</button>
                                    <input id='changeCV' type='file' onChange={(e) => setDocument(e.target.files[0])} className='form-control' name='document' placeholder='Change CV'></input>
                                </div>
                            </div>
                            <p className='auth-error'>{errMsg}</p>
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
                <button className='btn-logout button' type='button' onClick={logout}>LOGOUT</button>
            </div>
        </section>
        
        <div className="modal warning-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                        <h2 className="message">You are going to change your email address, are you sure?</h2>
                        <p>Please note that you are going to re verify your email address. </p>
                        <div className='button-div'>
                                <button type='button' onClick={changeNow} className="button">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Confirm</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeWarning} className="button button-cancel">
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
        <div className="modal ban-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                        <h2 className="message">Your account has been banned</h2>
                        <p>Please contact our email to make an appeal</p>
                        <div className='button-div'>
                                <button type='button' onClick={logout} className="button">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Ok</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                    </>
                )
            }
        </>
    )
}

export default ProfileItem