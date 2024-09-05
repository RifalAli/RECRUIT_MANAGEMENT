import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../assets/images/default.png'
import { fetchApiData, storeApiData } from "../../api/api";

const toggleApplierDetail = (state, index) => {
    let dropdown = document.getElementsByClassName('applier-detail')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const toggleProfileDetail = (state, index) => {
    let dropdown = document.getElementsByClassName('profile-detail')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const toggleAnswerModal = (state, index) => {
    let dropdown = document.getElementsByClassName('answer-modal')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const CompanyApplierItem = ({index, id, title, description, status, applicationDate, profile, company, job}) => {
    const [doRefresh, setDoRefresh] = useState(false)

    const showApplierDetail = () => {
        toggleApplierDetail('show', index)
    }

    const hideApplierDetail = () => {
        toggleApplierDetail('hide', index)
    }

    const showProfileDetail = () => {
        toggleProfileDetail('show', index)
    }

    const hideProfileDetail = () => {
        toggleProfileDetail('hide', index)
    }

    const closeAllDetail = () => {
        hideApplierDetail()
        hideProfileDetail()
        hideAnswerModal()
    }

    const [answerStatus, setAnswerStatus] = useState('')
    const [answerTitle, setAnswerTitle] = useState('')
    const [answerDescription, setAnswerDescription] = useState('')
    const [meeting_date, setMeeting_date] = useState('')
    const [meeting_link, setMeeting_link] = useState('')

    const acceptAnswerModal = () => {
        setAnswerStatus('accepted');
        toggleAnswerModal('show', index);
    }
    const rejectAnswerModal = () => {
        setAnswerStatus('rejected');
        toggleAnswerModal('show', index);
    }

    const hideAnswerModal = () => {
        setAnswerStatus('')
        toggleAnswerModal('hide', index)
    }

    // useEffect(() => {
    //     console.log(answerStatus)
    // }, [answerStatus])

    const postAnswer = () => {
        const formData = new FormData();
        formData.append('status', answerStatus)
        formData.append('title', answerTitle)
        formData.append('description', answerDescription)
        formData.append('meeting_date', meeting_date)
        formData.append('meeting_link', meeting_link)
        const createAnswer = async () => {
            await storeApiData(`answerJobApplication/${id}`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }
        
        createAnswer()
        closeAllDetail()
    }

    // const loadURLToInputField = () => {
    //     let file = new File()
    // }
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
        <button onClick={showApplierDetail}>
            <div className="company_applier__wrapper__card">
                <div className="company_applier__wrapper__card--center">
                    <div className="company_applier__wrapper__card--center__part-1">
                        <h1>{profile.fullname}</h1>
                        <p>{job.title}</p>
                        {/* <Link className={status === "pending" ? "half-time" : "full-time"} to={'#'}>{status}</Link> */}
                        <Link className={
                        status === "pending" ? 
                            "status-pending" 
                        : 
                            status === 'accepted' ? 
                            "status-accepted"
                            : 
                            "status-rejected"
                        } to={'#'}>{status}</Link>
                    </div>
                </div>
            </div>
        </button>
        <div className="applier-detail">
            <button className="applier-detail-hide" type="button" onClick={hideApplierDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <div className="applier-detail-container">
                <h1>Applier's Message</h1>
                <div className="applier-detail-row">
                    <p>Applier Name</p>
                    <p>: {profile.fullname}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Job Applied</p>
                    <p>: {job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Document</p>
                    {/* <iframe src={document} frameborder="0" style={{ width: '100%', height: '500px' }}></iframe> */}
                    <p>
                        : <a href={profile.document_url} download="applier's CV">View Applier's CV</a>
                    </p>
                </div>
                <div className="applier-detail-row">
                    <p>Detail</p>
                    <p>
                        : <button type="button" onClick={showProfileDetail} className="applier-detail-button">More Details</button>
                    </p>
                </div>
                <br /><br />
                <div className="applier-detail-container-button">
                    {
                        status === 'pending' ? (
                        <>
                            <button type="button" onClick={rejectAnswerModal} className="btn-reject half-time">Reject</button>
                            <button type="button" onClick={acceptAnswerModal} className="btn-accept full-time">Accept</button>
                        </>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </div>
        <div className="profile-detail">
            <button className="applier-detail-hide" type="button" onClick={hideProfileDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <div className="applier-detail-container">
                <h1>Applier's Profile Detail</h1>
                <br />
                <div className="applier-detail-row">
                    <p>Fullname</p>
                    <p>: {profile.fullname}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Age</p>
                    <p>: {profile.age}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Address</p>
                    <p>: {profile.address}</p>
                </div>
                {/* <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: {profile.description}</p>
                </div> */}
                <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: 
                    <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={profile.description}></textarea>
                    </p>
                </div>
                <div className="applier-detail-row">
                    <p>Last Education</p>
                    <p>: {profile.last_education}</p>
                </div>
                {/* <div className="applier-detail-row">
                    <p>Status</p>
                    <p>: {profile.status}</p>
                </div> */}
                <br />
                <h1>Job Applied Detail</h1>
                <br />
                <div className="applier-detail-row">
                    <p>Title</p>
                    <p>: {job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Salary</p>
                    <p>: {job.salary}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Type</p>
                    <p>: {job.type}</p>
                </div>
                {/* <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: {job.description}</p>
                </div> */}
                <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: 
                    <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={company.description}></textarea>
                    </p>
                </div>
            </div>
        </div>
        <div className="answer-modal">
                <div className="modal-container">
                    <form>
                        {
                            answerStatus == 'accepted' ? (
                                <>
                                    <h1>Applier's Accept Message</h1>
                                </>
                            )  : (
                                <>
                                    <h1>Applier's Reject Message</h1>
                                </>
                            )
                        }
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="title">Title: </label>
                                <input type="text" className='form-control' name="title" placeholder='Job Title' value={answerTitle} onChange={(e) => setAnswerTitle(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Message: </label>
                                <input type="text" className='form-control' name="description" placeholder='Message' value={answerDescription} onChange={(e) => setAnswerDescription(e.target.value)}/>
                            </div>
                            {
                                answerStatus === 'accepted' ? (
                                    <>
                            {/* <div className='form-row'>
                                <label htmlFor="meeting_date">Meeting Date: </label>
                                <input type="date" className='form-control' name="expire_at" placeholder='meeting date' value={meeting_date} onChange={(e) => setMeeting_date(e.target.value)}/>
                            </div> */}
                            {/* <div className='form-row'>
                                <label htmlFor="meeting_link">Meeting Link: </label>
                                <input type="text" className='form-control' name="meeting_link" placeholder='Meeting Link' value={meeting_link} onChange={(e) => setMeeting_link(e.target.value)}/>
                            </div>   */}
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                            <div className='button-div'>
                                <button type='button' className="button" onClick={postAnswer}>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Post Answer</span>
                                    </div>
                                </button>
                                <button type='button' onClick={hideAnswerModal} className="button button-cancel">
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
        </>
    )
}

export default CompanyApplierItem