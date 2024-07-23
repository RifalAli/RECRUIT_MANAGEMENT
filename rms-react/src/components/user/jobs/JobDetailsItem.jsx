import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    jobDetailModal.style.display = 'none';
    unauthorizedModal.style.display = 'none';
}

const JobDetailsItem = ({ job, similar }) => {
    const [role, setRole]  = useState('')
    const [message, setMessage] = useState('')
    const [user, setUser] = useState([])
    const [profile, setProfile] = useState(null)
    
    useEffect(() => {
        setRole(localStorage.getItem('role'))

        if (role == 'undefined') {
            setMessage('Please Login or Register Before Apply Job')
        }else if (role == 'company') {
            setMessage('Company can\'t Apply Job')
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
                setUser(response.data.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }

        const getCompleteProfile = async () => {
            if (user) {
                const response = await fetchApiData(`user-complete-profile/${user.id}`);
                if (response && response.status && response.status === true) {
                    setProfile(response.data.profile);
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
    // const [profile_id, setProfile_id] = useState('')
    // const [company_id, setCompany_id] = useState('')
    // const [job_id, setJob_id] = useState('')

    // console.log(job)

    // useEffect(() => {
    //     console.log(role)
    // }, [role])

    function openModal() {
        checkRole(role)
    }

    const applyJob = async (e) => {
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
            console.log(response.data)
        }catch (error) {
            console.log('error');
        }
    }

    return (
        <section className="details_info">
            <div className="container">
                <div className="row">
                    <div className="left">
                        <h1>Job Description</h1>
                        <div>{job && job.description}</div>
                        {/* <Link className='button' to='/'>Apply Job</Link> */}
                        <button className='button' onClick={openModal} type='button'>Apply Job</button>
                    </div>
                    <div className="right">
                        <h1>Job Location</h1>
                        <div className="location-map">Map will be rendered here</div>
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
                                <button type='button' onClick={openModal} className="button">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Apply Job</span>
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

            <div className="modal job-detail-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="title">Title: </label>
                                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='form-control' name="title" placeholder='Job Title'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className='form-control' name="tag" placeholder='Job Tag'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="CV">Curriculum Vitae: </label>
                                <input type="file" onChange={(e)=>setDocument(e.target.files[0])} className='form-control' name="CV" placeholder='Job Document'/>
                            </div>
                            <div className='button-div'>
                                <button type='button' onClick={applyJob} className="button">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Apply Job</span>
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
    )
}

export default JobDetailsItem