import React from 'react'
import { storeApiData } from '../../../api/api'

const toggleBanDetail = (state, index) => {
    console.log(index)
    const modal = document.getElementsByClassName("ban-profile-detail")[index]

    if (state == 'show') modal.style.display = 'block';
    if (state == 'hide') modal.style.display = 'none';
}

const toggleNormalDetail = (state, index) => {
    console.log(index)
    const modal = document.getElementsByClassName("normal-profile-detail")[index]

    if (state == 'show') modal.style.display = 'block';
    if (state == 'hide') modal.style.display = 'none';
}

const AdminBanItem = ( { index, image, refresh_normal, refresh_banned, user_id, userDetail, userRole, status } ) => {
    const showBanDetail = () => {
        toggleBanDetail('show', index)
    }

    const hideBanDetail = () => {
        toggleBanDetail('hide', index)
    }

    const showNormalDetail = () => {
        toggleNormalDetail('show', index)
    }

    const hideNormalDetail = () => {
        toggleNormalDetail('hide', index)
    }

    const banUser = () => {
        const createBan = async () => {
            await storeApiData(`banUser/ban/${user_id}`)
            .then((response) => {})
            .then((response) => { refresh_normal(); refresh_banned(); })
            .catch((response) => {})
        }

        createBan()
    }

    const unbanUser = () => {
        const removeBan = async () => {
            await storeApiData(`banUser/unban/${user_id}`)
            .then((response) => {})
            .then((response) => { refresh_banned(); refresh_normal(); })
            .catch((response) => {})
        }

        removeBan()
    }

    return (
        <>
            <div className='ban__wrapper'>
                {
                    userRole === 'profile' ? (
                        <p>{userDetail.fullname}</p>
                    ) : (
                        <p>{userDetail.name}</p>
                    )
                }
                <div className="action-container">
                {
                    status === 'normal' ? (
                        <>
                            <button className='ban-button-detail' onClick={showNormalDetail} type='button'>Detail</button>
                        </>
                    ) : (
                        <>
                            <button className='ban-button-detail' onClick={showBanDetail} type='button'>Detail</button>
                        </>
                    )
                }
                {
                    status === 'normal' ? (
                        <>
                            <button className='ban-button' onClick={banUser} type='button'>Ban</button>
                        </>
                    ) : (
                        <>
                            <button className='unban-button' onClick={unbanUser} type='button'>Unban</button>
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
                                        {
                                            userRole === "company" ? (
                                                <p>: {userDetail.name}</p>
                                            ) : (
                                                <p>: {userDetail.fullname}</p>
                                            )
                                        }
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Role</p>
                                        {
                                            userRole === "company" ? (
                                                <p>: Company</p>
                                            ) : (
                                                <p>: Job Seeker</p>
                                            )
                                        }
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Address</p>
                                        {
                                            userRole === "company" ? (
                                                <p>: {userDetail.location}</p>
                                            ) : (
                                                <p>: {userDetail.address}</p>
                                            )
                                        }
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Description</p>
                                        <p>: 
                                        <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={userDetail.description}></textarea>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='ban-profile-detail'>
                            <button className="applier-detail-hide" type="button" onClick={hideBanDetail}>
                                <i className="fa fa-close fa-fw"></i>
                            </button>
                            <h1>Profile Detail</h1>
                            <br />
                            <div className="applier-detail-parent">
                                <img className="applier-photo" src={image} alt="" />
                                <div className="applier-detail-container">
                                    <div className="applier-detail-row">
                                        <p>Name</p>
                                        {
                                            userRole === "company" ? (
                                                <p>: {userDetail.name}</p>
                                            ) : (
                                                <p>: {userDetail.fullname}</p>
                                            )
                                        }
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Role</p>
                                        {
                                            userRole === "company" ? (
                                                <p>: Company</p>
                                            ) : (
                                                <p>: Job Seeker</p>
                                            )
                                        }
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Address</p>
                                        {
                                            userRole === "company" ? (
                                                <p>: {userDetail.location}</p>
                                            ) : (
                                                <p>: {userDetail.address}</p>
                                            )
                                        }
                                    </div>
                                    <div className="applier-detail-row">
                                        <p>Description</p>
                                        <p>: 
                                        <textarea readOnly className='form-control' id="text-area" cols="30" rows="20" value={userDetail.description}></textarea>
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

export default AdminBanItem