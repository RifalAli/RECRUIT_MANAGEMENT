import React, { useEffect, useState } from 'react'
import NavBar from '../user/pages/navigation/NavBar'
import CompanyItem from './CompanyItem'
import Footer from '../user/footer/Footer'
import CompanyBlacklisItem from './CompanyBlacklistItem'
import { fetchApiData } from '../../api/api'
import AdminJobItem from '../admin/AdminJob/AdminJobItem'

const showBlacklistModal = () => {
    const modal = document.getElementsByClassName('blacklist-modal')[0];
    modal.style.display = 'block';
}
const hideBlacklistModal = () => {
    const modal = document.getElementsByClassName('blacklist-modal')[0];
    modal.style.display = 'none';
}

const CompanyBlacklist = ( { company_id, user_id } ) => {
    const [blacklistUser , setBlacklistUser ] = useState();
    const [normalUsers, setNormalUsers] = useState();

    const [blacklistResponse, setBlacklistResponse] = useState();
    const [normalResponse, setNormalResponse] = useState();

    const getBlacklistUser = async () => {
        await fetchApiData(`getBlacklist/${user_id}`)
        .then((response) => { setBlacklistResponse(response.data) })
        .catch((response) => { console.log(response) } )
    }

    const getNormalUser = async () => {
        await fetchApiData(`getUsers/${user_id}`)
        .then((response) => { setNormalResponse(response.data) })
        .catch((response) => { console.log(response) } )
    }

    useEffect(() => {
        if (company_id && user_id) {
            getNormalUser();
            getBlacklistUser();
        }
    }, [company_id, user_id])

    return (
        <>
            <div className="company_blacklist">
                <p>Feel disappointed with some user? try to blacklist them. </p>
                <button type='button' className='button blacklist' onClick={showBlacklistModal}>View Blacklist</button>
            </div>

            <div className="blacklist-modal">
                <button className="modal-blacklist-hide" type="button" onClick={hideBlacklistModal}>
                    <i className="fa fa-close fa-fw"></i>
                </button>
                <div className='blacklist-head-container'>
                    <h1>Blacklist</h1>
                    <div className="blacklist-container">
                        <div className="blacklist-body-container">
                            <p>Already Blacklist: </p>
                            <div className="blacklist-item-container">
                                {
                                    blacklistResponse && blacklistResponse === 'Nothing' ? (
                                        <p className="empty-msg">No blacklist user yet</p>
                                    ) : (
                                        blacklistResponse && blacklistResponse.blacklist.map((item, i) => (
                                            <CompanyBlacklisItem index={i} refresh_normal={getNormalUser} refresh_blacklist={getBlacklistUser} image={item.user_profile.image} key={i} blacklist_id={item.id} company_id={company_id} user_id={item.user_profile.id} profile={item.profile} status='blacklist' />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        <hr className='blacklist-hr' />
                        <div className="users-body-container">
                            <p>Not Yet Blacklist: </p>
                            <div className="users-item-container">
                                {
                                    normalResponse && normalResponse === 'Nothing' ? (
                                        <p className="empty-msg">No users that can be blacklist anymore</p>
                                    ) : (
                                        normalResponse && normalResponse.map((item, i) => (
                                            <CompanyBlacklisItem index={i} refresh_normal={getNormalUser} refresh_blacklist={getBlacklistUser} image={item.image} key={i} company_id={company_id} user_id={item.id}  profile={item.profile} status='normal' />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyBlacklist