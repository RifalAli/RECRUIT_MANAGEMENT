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

const CompanyApplierItem = ({index, id, title, description, image, status, applicationDate, profile, company, job, fetchAllAppliers, fetchArchivedAppliers, applicationStatus}) => {
    const [dropdownState, setDropdownState] = useState(false)
    const [doRefresh, setDoRefresh] = useState(false)

    const toggleDropdown = () => {
        let dropdown = document.getElementsByClassName('company_applier__wrapper__card--center__dropdown')[index];
        if (dropdownState) {
            dropdown.style.display = 'none';
        }else {
            dropdown.style.display = 'block';
        }

        setDropdownState(!dropdownState);
    }

    const archiveHandler = async () => {
        await storeApiData(`archiveApplication/company/archive/${id}`)
        .then((response) => console.log(response))
        .then((response) => fetchAllAppliers())
        .catch((response) => console.log(response))
    }

    const unarchiveHandler = async () => {
        await storeApiData(`archiveApplication/company/unarchive/${id}`)
        .then((response) => console.log(response))
        .then((response) => fetchArchivedAppliers())
        .catch((response) => console.log(response))
    }

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
    const [answerMessage, setAnswerMessage] = useState('')

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
        formData.append('message', answerMessage)
        const createAnswer = async () => {
            await storeApiData(`answerJobApplication/${id}`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }
        
        createAnswer()
        closeAllDetail()
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
        <div>
            <div className="company_applier__wrapper__card">
                <div className="company_applier__wrapper__card--center">
                    <div className="company_applier__wrapper__card--center__part-1" onClick={showApplierDetail}>
                        <h1>{profile.fullname}</h1>
                        <p>{job.title}</p>
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
                    {
                        applicationStatus && applicationStatus == 'normal' ? (
                            <>
                                <div className="company_applier__wrapper__card--center__part-2">
                                    <i className="fa fa-caret-down" onClick={toggleDropdown}></i>
                                </div>
                                <ul className="company_applier__wrapper__card--center__dropdown">
                                    <li>
                                        <button type="button" onClick={archiveHandler}              className="company_applier__wrapper__card--center__dropdown_item"><i className="fa fa-pencil fa-fw"></i><span>Archive</span></button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <>
                            <button type="button" onClick={unarchiveHandler}  className="btn-unarchive"><i className="fa fa-pencil fa-fw"></i><span>Unarchive</span></button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
        <div className="applier-detail">
            <button className="applier-detail-hide" type="button" onClick={hideApplierDetail}>
                <i className="fa fa-close fa-fw"></i>
            </button>
            <h1>Applier's Message</h1>
            <br />
            <div className="applier-detail-parent">
            <img className="applier-photo" src={image} alt="" />
            <div className="applier-detail-container">
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
                <br />
            </div>
            </div>
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
                <br />
                <h1>Job Applied Detail</h1>
                <br />
                <div className="applier-detail-row">
                    <p>Title</p>
                    <p>: {job.title}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Salary</p>
                    <p>: {Number(job.salary).toLocaleString("id", {currency: "IDR", style: "currency"})}</p>
                </div>
                <div className="applier-detail-row">
                    <p>Type</p>
                    <p>: {job.type}</p>
                </div>
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
                                <input type="text" className='form-control' name="title" placeholder='Title' value={answerTitle} onChange={(e) => setAnswerTitle(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="message">Message: </label>
                                <textarea className='form-control' name="message" id="text-area" cols="30" rows="20" placeholder='Message' value={answerMessage} onChange={(e) => setAnswerMessage(e.target.value)}></textarea>
                            </div>
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
            </div>
        </>
    )
}

export default CompanyApplierItem