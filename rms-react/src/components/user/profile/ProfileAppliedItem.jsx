import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../../assets/images/default.png'
import { fetchApiData, storeApiData } from "../../../api/api";

const toggleAppliedDetail = (state, index) => {
    let dropdown = document.getElementsByClassName('applied-detail')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const toggleProfileDetail = (state, index) => {
    let dropdown = document.getElementsByClassName('profile-detail')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const toggleJobDetail = (state, index) => {
    let dropdown = document.getElementsByClassName('job-detail')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const toggleAnswerModal = (state, index) => {
    let dropdown = document.getElementsByClassName('answer-modal')[index];

    if (state == 'show') dropdown.style.display = 'block';
    if (state == 'hide') dropdown.style.display = 'none';
}

const ProfileAppliedItem = ({index, id, title, description, document_url, status, application_date, profile_id, company_id, job_id, main_job, applicationAnswer}) => {
    // const [doRefresh, setDoRefresh] = useState(false)
    // console.log(main_job)
    // console.log(applicationAnswer)
    // console.log(main_job)

    const showApplierDetail = () => {
        toggleAppliedDetail('show', index)
    }

    const hideApplierDetail = () => {
        toggleAppliedDetail('hide', index)
    }

    const showProfileDetail = () => {
        toggleProfileDetail('show', index)
    }

    const hideProfileDetail = () => {
        toggleProfileDetail('hide', index)
    }

    const showJobDetail = () => {
        toggleJobDetail('show', index)
    }

    const hideJobDetail = () => {
        toggleJobDetail('hide', index)
    }

    const closeAllDetail = () => {
        hideApplierDetail()
        hideProfileDetail()
        hideJobDetail()
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
            .catch((response)=>console.log(response.data))
        }
        
        createAnswer()
        closeAllDetail()
    }

    // const loadURLToInputField = () => {
    //     let file = new File()
    // }

    // console.log(document_url)

    return (
        <>
        <button onClick={showApplierDetail}>
            <div className="company_applier__wrapper__card">
                <div className="company_applier__wrapper__card--center">
                    <div className="company_applier__wrapper__card--center__part-1">
                        <h1>{main_job.title}</h1>
                        <p>{description}</p>
                        <p className={status === "pending" ? "half-time" : "full-time"}>{status}</p>
                    </div>
                </div>
            </div>
        </button>
        <div className="applied-detail">
            <button className="applier-detail-hide" type="button" onClick={hideApplierDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <div className="applier-detail-container">
                <h1>Job Applied</h1>
                <div className="applier-detail-row">
                    <p>Job Title: </p>
                    <p>{main_job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Job Description: </p>
                    <p>{main_job.description}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Job Salary: </p>
                    <p>{main_job.salary}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Type: </p>
                    <p>{main_job.type}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Your CV: </p>
                    <a href={document_url} download="applied">View your CV</a>
                </div>
                <br />
                <h1>Details</h1>
                {applicationAnswer && applicationAnswer  ? (
                    <>
                        <div className="applier-detail-container">
                <div className="applier-detail-row">
                    <p>Title: </p>
                    <p>{applicationAnswer.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description: </p>
                    <p>{applicationAnswer.description}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Meeting Date: </p>
                    <p>{applicationAnswer.meeting_date}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Meeting Link: </p>
                    <a href={applicationAnswer.meeting_link}>{applicationAnswer.meeting_link}</a>
                </div>
                </div>
                    </>
                ) : (
                    <>
                        <p>Your request is still pending</p>
                    </>
                )}
                {/* <button type="button" onClick={showProfileDetail} className="applier-detail-profile-button">Click to See Applier's Profile Detail</button> */}
                {/* <button type="button" onClick={showJobDetail} className="applier-detail-job-button">Click to See Job Applied Detail</button> */}
            </div>
        </div>
        { /* <div className="profile-detail">
            <button className="applier-detail-hide" type="button" onClick={hideProfileDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <div className="applier-detail-container">
                <h1>Applier's Profile Detail</h1>
                <div className="applier-detail-row">
                    <p>Fullname: </p>
                    <p>{profile.fullname}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Age: </p>
                    <p>{profile.age}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Address: </p>
                    <p>{profile.address}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description: </p>
                    <p>{profile.description}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Last Education: </p>
                    <p>{profile.last_education}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Status: </p>
                    <p>{profile.status}</p>
                </div>
            </div>
        </div>
        <div className="job-detail">
            <button className="applier-detail-hide" type="button" onClick={hideJobDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <div className="applier-detail-container">
                <h1>Job Applied Detail</h1>
                <div className="applier-detail-row">
                    <p>Title: </p>
                    <p>{job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Tag: </p>
                    <p>{job.tag}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Salary: </p>
                    <p>{job.salary}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Type: </p>
                    <p>{job.type}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description: </p>
                    <p>{job.description}</p>
                </div>
            </div>
        </div>
        <div className="answer-modal">
                <div className="modal-container">
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="title">Title: </label>
                                <input type="text" className='form-control' name="title" placeholder='Job Title' value={answerTitle} onChange={(e) => setAnswerTitle(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="description" placeholder='Description' value={answerDescription} onChange={(e) => setAnswerDescription(e.target.value)}/>
                            </div>
                            {
                                answerStatus === 'accepted' ? (
                                    <>
                            <div className='form-row'>
                                <label htmlFor="meeting_date">Meeting Date: </label>
                                <input type="date" className='form-control' name="close_date" placeholder='meeting date' value={meeting_date} onChange={(e) => setMeeting_date(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="meeting_link">Meeting Link: </label>
                                <input type="text" className='form-control' name="meeting_link" placeholder='Meeting Link' value={meeting_link} onChange={(e) => setMeeting_link(e.target.value)}/>
                            </div>  
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                            <div className='button-div'>
                                <button type='button' className="button" onClick={postAnswer}>
                                    <div>
                                        <span>Post Answer</span>
                                    </div>
                                </button>
                                <button type='button' onClick={hideAnswerModal} className="button button-cancel">
                                    <div>
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div> */}
        </>
    )
}

export default ProfileAppliedItem