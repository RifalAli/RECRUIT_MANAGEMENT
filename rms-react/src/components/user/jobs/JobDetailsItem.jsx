import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeaturedJob from '../featured-jobs/FeaturedJob'
import { fetchApiData, storeApiData } from '../../../api/api';
import axios from 'axios';

const checkRole = (role) => {
    if (role == 'job seeker') {
        let jobModal = document.getElementsByClassName('job-detail-modal')[0];
        jobModal.style.display = 'block';
    }else {
        let modal = document.getElementsByClassName('unauthorized-modal')[0];
        modal.style.display = 'block';
    }
}

const closeModal = () => {
    let jobDetailModal = document.getElementsByClassName('job-detail-modal')[0];
    let unauthorizedModal = document.getElementsByClassName('unauthorized-modal')[0];
    let failedModal = document.getElementsByClassName('failed-modal')[0];
    let successModal = document.getElementsByClassName('success-modal')[0];
    jobDetailModal.style.display = 'none';
    unauthorizedModal.style.display = 'none';
    failedModal.style.display = 'none';
    successModal.style.display = 'none';
}

const showBanModal = () => {
    let modal = document.getElementsByClassName('ban-modal')[0];
    modal.style.display = 'block';
}

const showFailedModal = () => {
    let modal = document.getElementsByClassName('success-modal')[0];
    modal.style.display = 'block';
}

const showSuccessModal = () => {
    let modal = document.getElementsByClassName('success-modal')[0];
    modal.style.display = 'block';
}


const JobDetailsItem = ({ job, similar }) => {
    const [applyReady, setApplyReady] = useState(false)

    const [role, setRole]  = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState([])
    const [profile, setProfile] = useState(null)

    const [applyResponse, setApplyResponse] = useState('')
    const [applyResponseMsg, setApplyResponseMsg] = useState('')
    
    useEffect(() => {
        setRole(localStorage.getItem('role'))

        if (role == null) {
            setMessage('You Need an Account to Apply Job')
        }else if (role == 'company') {
            setMessage('Company can\'t Apply Job')
        }else if (role == 'admin') {
            setMessage('Admin can\'t Apply Job')
        }

        if (profile == null) {
            checkProfile()
        }
    }, [role, user ,profile])

    const checkProfile = async () => {
        const getUser = async () => {
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
        }

        const getCompleteProfile = async () => {
            if (user) {
                const response = await fetchApiData(`user-complete-profile/${user.id}`);
                if (response && response.status && response.status === true) {
                    setProfile(response?.data.profile);
                }else {
                    console.log(response);
                }
            }
        };
        getUser();
        getCompleteProfile();
    };

    console.log(profile)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [document, setDocument] = useState(null)
    const [status, setStatus] = useState('pending')

    function openModal() {
        checkRole(role)
    }

    const applyJobHandler = () => {
        const validation = () => {
            if (user.verify === 0) {
                window.location = '/verify';
                return;
            }

            fillForm()
        }

        const fillForm = () => {
            const formData = new FormData();

            formData.append('company_id', job?.company[0]?.id)
            formData.append('job_id', job?.id)
            formData.append('profile_id', profile?.id)

            createApplication(formData)
            closeModal()
        }

        const createApplication = async (formData) => {
            await storeApiData('applyJob', formData)
            .then((response) => { setApplyResponse(response); console.log(response); console.log(applyResponse) } )
            .catch((response) => { console.log(response) })
        }

        setApplyResponse('')
        setApplyResponseMsg('')
        validation()
    }

    useEffect(() => {
        if (applyResponse) {
            proccessData()
        }
    }, [applyResponse])

    useEffect(() => {
        setTimeout(() => {
            setApplyReady(true)
        }, 4000)
    }, [])

    const proccessData = () => {
        const moreValidation = () => {
            if (applyResponse === 'Already apply') {
                showFailedModal()
                setApplyResponseMsg('You already apply this job, please wait until the company give their respond')
            }else if (applyResponse === 'Empty profile') {
                showFailedModal()
                setApplyResponseMsg('Please fill your profile before apply this job')
            }else if (applyResponse === 'Banned user') {
                showBanModal()
            }else if (applyResponse.data) {
                showSuccessModal()
                setApplyResponseMsg('Success apply this job')
            }
        }

        moreValidation();
    }

    const applyJob = () => {
        if (user.verify === 0) {
            window.location = '/verify';
        }

        const formData = new FormData();

        formData.append('company_id', job.company[0]?.id)
        formData.append('job_id', job?.id)
        formData.append('profile_id', profile?.id)

        const createApplication = async () => {
            await storeApiData('applyJob', formData)
            .then((response)=>console.log(response?.data))
            .catch((response)=>console.log(response?.data))
        }

        createApplication()
        setApplyResponseMsg('')
        closeModal()
    }

    const applyJobWithDocument = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('company_id', job.company[0].id)
        formData.append('job_id', job.id)
        formData.append('profile_id', profile.id)
        formData.append('file', document)

        try {
            const response = await axios.post('http://localhost:8000/applyJob', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log('tes')
            console.log(response?.data)
            closeModal()
        }catch (error) {
            console.log('error');
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location = '/login';
    }

    return (
        <section className="details_info">
            <div className="container">
                <div className="row">
                    <div className="left">
                        <h1>Job Description</h1>
                        <textarea readOnly className='form-control long-text' id="text-area" cols="30" rows="20" value={job && job.description} disabled></textarea>
                        {
                            applyReady ? (
                            <button className='button' onClick={openModal} type='button'>Apply Job</button>
                        ) : (
                            <button className='button' style={{ background: "#a9a9a9" }} type='button'>Apply Job</button>
                            )
                        }
                    </div>
                    <div className="right">
                        <h1>Company Description</h1>
                        <div className="location-map">
                            <textarea readOnly className='form-control long-text' id="text-area" cols="30" rows="20" value={job?.company[0].description} disabled></textarea>
                        </div>
                    </div>
                </div>
                <FeaturedJob featured={similar} similar={'similar'} />
            </div>

            <div className="modal unauthorized-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                        <h2 className="message">{message}</h2>
                        <div className='button-div'>
                            {
                                role == null ? (
                                    <>
                                        <Link to='/login' className='button'>Login</Link>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
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

            <div className="modal failed-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                        <h2 className="message">{applyResponseMsg}</h2>
                        <div className='button-div'>
                            {
                                role == null ? (
                                    <>
                                        <Link to='/login' className='button'>Login</Link>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                                <button type='button' onClick={closeModal} className="button">
                                    <div>
                                        <span>Confirm</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="modal success-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                        <h2 className="message">{applyResponseMsg}</h2>
                        <div className='button-div'>
                            {
                                role == null ? (
                                    <>
                                        <Link to='/login' className='button'>Login</Link>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                                <button type='button' onClick={closeModal} className="button">
                                    <div>
                                        <span>Confirm</span>
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
                        <h2 className="message">Cannot apply this job because your account has been banned</h2>
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

            <div className="modal job-detail-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                            <h1>Are you sure want to apply this job?</h1>
                            <div className='button-div'>
                                <button type='button' onClick={applyJobHandler} className="button">
                                    <div>
                                        <span>Apply Job</span>
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
        </section>
    )
}

export default JobDetailsItem