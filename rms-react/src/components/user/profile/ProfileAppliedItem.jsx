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

const ProfileAppliedItem = ({index, id, title, description, document_url, status, application_date, profile_id, company_id, job_id, main_job, applicationAnswer, company}) => {
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

    return (
        <>
        <button onClick={showApplierDetail}>
            <div className="company_applier__wrapper__card">
                <div className="company_applier__wrapper__card--center">
                    <div className="company_applier__wrapper__card--center__part-1">
                        <h1>{main_job.title}</h1>
                        <p>{description}</p>
                        <p className={
                            status === "pending" ? 
                            "status-pending" 
                        : 
                            status === 'accepted' ? 
                            "status-accepted"
                            : 
                            "status-rejected"
                        }>{status}</p>
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
                    <p>Job Title</p>
                    <p>: {main_job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: 
                    <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={main_job.description}></textarea>
                    </p>
                </div>
                <div className="applier-detail-row">
                    <p>Job Salary</p>
                    <p>: {Number(main_job.salary).toLocaleString("id", {currency: "IDR", style: "currency"})}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Company Name</p>
                    <p>: {company.name}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Company Location</p>
                    <p>: {company.location}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Type</p>
                    <p>: {main_job.type}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Your CV</p>
                    <p>
                        : <a href={document_url} download="applied">View your CV</a>
                    </p>
                </div>
                <div className="applier-detail-row">
                    <p>Detail</p>
                    <p>
                        : <button type="button" onClick={showProfileDetail} className="applier-detail-button">More Details</button>
                    </p>
                </div>
                <br />
                <h1>Request Details</h1>
                {applicationAnswer && applicationAnswer  ? (
                    <>
                        <div className="applier-detail-container">
                <div className="applier-detail-row">
                    <p>Title</p>
                    <p>: {applicationAnswer.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: 
                    <textarea readOnly className='form-control application-description' cols="30" rows="20" value={applicationAnswer.message}></textarea>
                    </p>
                </div>
                <div className="applier-detail-row">
                    <p>Status</p>
                    <p>
                        : Your request was <span className={status == 'accepted' ? 'accepted' : 'rejected'}>{status}</span>
                    </p>
                </div>
                </div>
                    </>
                ) : (
                    <>
                        <p className="pending">Your request is still pending</p>
                    </>
                )}
            </div>
        </div>
        <div className="profile-detail">
            <button className="applier-detail-hide" type="button" onClick={hideProfileDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <div className="applier-detail-container">
                <h1>Company Detail</h1>
                <div className="applier-detail-row">
                    <p>Name</p>
                    <p>: {company.name}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Location</p>
                    <p>: {company.location}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: 
                    <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={company.description}></textarea>
                    </p>
                </div>
                <br />
                <h1>Job Detail</h1>
                <div className="applier-detail-row">
                    <p>Name</p>
                    <p>: {main_job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Salary</p>
                    <p>: {Number(main_job.salary).toLocaleString("id", {currency: "IDR", style: "currency"})}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Description</p>
                    <p>: 
                    <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={main_job.description}></textarea>
                    </p>
                </div>
                <div className="applier-detail-row">
                    <p>Type</p>
                    <p>: {main_job.type}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Expire at</p>
                    <p>: {main_job.expire_at}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfileAppliedItem