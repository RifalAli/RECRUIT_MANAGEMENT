import React from 'react'
import NavBar from '../user/pages/navigation/NavBar'
import CompanyItem from './CompanyItem'
import Footer from '../user/footer/Footer'
import { storeApiData } from '../../api/api'

const toggleBlacklistDetail = (state, index) => {
    console.log(index)
    const modal = document.getElementsByClassName("blacklist-profile-detail")[index]

    if (state == 'show') modal.style.display = 'block';
    if (state == 'hide') modal.style.display = 'none';
}

const toggleNormalDetail = (state, index) => {
    console.log(index)
    const modal = document.getElementsByClassName("normal-profile-detail")[index]

    if (state == 'show') modal.style.display = 'block';
    if (state == 'hide') modal.style.display = 'none';
}

const CompanyBlacklisItem = ( { index, image, refresh_normal, refresh_blacklist, blacklist_id, company_id, user_id, profile, status } ) => {
    const showBlacklistDetail = () => {
        toggleBlacklistDetail('show', index)
    }

    const hideBlacklistDetail = () => {
        toggleBlacklistDetail('hide', index)
    }

    const showNormalDetail = () => {
        toggleNormalDetail('show', index)
    }

    const hideNormalDetail = () => {
        toggleNormalDetail('hide', index)
    }

    const blacklistUser = () => {
        const createBlacklist = async () => {
            await storeApiData(`blacklistUser`, { user_id, company_id })
            .then((response) => {})
            .then((response) => { refresh_normal(); refresh_blacklist(); })
            .catch((response) => {})
        }

        createBlacklist()
    }

    const unblacklistUser = () => {
        const removeBlacklist = async () => {
            await storeApiData(`unblacklistUser`, { blacklist_id })
            .then((response) => {})
            .then((response) => { refresh_blacklist(); refresh_normal(); })
            .catch((response) => {})
        }

        removeBlacklist()
    }

    return (
        <>
            <div className='blacklist__wrapper'>
                <p>{profile.fullname}</p>
                <div className="action-container">
                {
                        status === 'normal' ? (
                            <>
                                <button className='blacklist-button-detail' onClick={showNormalDetail} type='button'>Detail</button>
                            </>
                        ) : (
                            <>
                                <button className='blacklist-button-detail' onClick={showBlacklistDetail} type='button'>Detail</button>
                            </>
                        )
                    }
                    {
                        status === 'normal' ? (
                            <>
                                <button className='blacklist-button' onClick={blacklistUser} type='button'>Blacklist</button>
                            </>
                        ) : (
                            <>
                                <button className='unblacklist-button' onClick={unblacklistUser} type='button'>Unblacklist</button>
                            </>
                        )
                    }
                </div>
            </div>
            {
                status === 'normal' ? (
                    <>
                        <div className='normal-profile-detail'>
                            <button className="applier-detail-hide" type="button" onClick={hideNormalDetail}>
                                <i className="fa fa-close fa-fw"></i>
                            </button>
                            <h1>Profile Detail</h1>
                            <br />
                            <div className="applier-detail-parent">
                                <img className="applier-photo" src={image} alt="" />
                                <div className="applier-detail-container">
                                    <div className="applier-detail-row">
                                        <p>Name</p>
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
                                        <p>Last Edu</p>
                                        <p>: {profile.last_education}</p>
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Description</p>
                                        <p>: 
                                        <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={profile.description}></textarea>
                                        </p>
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Document</p>
                                        <p>
                                            : <a href={profile.document_url} download="user CV">View User CV</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='blacklist-profile-detail'>
                            <button className="applier-detail-hide" type="button" onClick={hideBlacklistDetail}>
                                <i className="fa fa-close fa-fw"></i>
                            </button>
                            <h1>Profile Detail</h1>
                            <br />
                            <div className="applier-detail-parent">
                                <img className="applier-photo" src={image} alt="" />
                                <div className="applier-detail-container">
                                    <div className="applier-detail-row">
                                        <p>Name</p>
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
                                        <p>Last Edu</p>
                                        <p>: {profile.last_education}</p>
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Description</p>
                                        <p>: 
                                        <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={profile.description}></textarea>
                                        </p>
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Document</p>
                                        <p>
                                            : <a href={profile.document_url} download="user CV">View User CV</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CompanyBlacklisItem