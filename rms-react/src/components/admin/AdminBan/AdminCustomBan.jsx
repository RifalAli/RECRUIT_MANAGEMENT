import React, { useEffect, useState } from "react";
import AdminBanItem from "./AdminBanItem";
import { fetchApiData } from "../../../api/api";

const showBanModal = () => {
    const modal = document.getElementsByClassName('ban-modal')[0];
    modal.style.display = 'block';
}
const hideBanModal = () => {
    const modal = document.getElementsByClassName('ban-modal')[0];
    modal.style.display = 'none';
}

const AdminCustomBan = () => {
    const [bannedUsers , setBannedUsers] = useState();
    const [normalUsers, setNormalUsers] = useState();

    const [bannedResponse, setBannedResponse] = useState();
    const [normalResponse, setNormalResponse] = useState();

    const getBannedUser = async () => {
        await fetchApiData(`getBannedUser`)
        .then((response) => { setBannedResponse(response.data) })
        .catch((response) => { console.log(response) } )
    }

    const getNormalUser = async () => {
        await fetchApiData(`getNormalUser`)
        .then((response) => { setNormalResponse(response.data) })
        .catch((response) => { console.log(response) } )
    }

    useEffect(() => {
        getNormalUser();
        getBannedUser();
    }, [])

    return (
        <>
        <div className="admin">
            <div className="container">
        <div className="ban-admin-div">
            <div className="admin_ban">
                <button type='button' className='button ban' onClick={showBanModal}>View Banned User</button>
            </div>

            <div className="ban-modal">
                <button className="modal-ban-hide" type="button" onClick={hideBanModal}>
                    <i className="fa fa-close fa-fw"></i>
                </button>
                <div className='ban-head-container'>
                    <h1>Ban user</h1>
                    <div className="ban-container">
                        <div className="ban-body-container">
                            <p>Already Ban: </p>
                            <div className="ban-item-container">
                                {
                                    bannedResponse && bannedResponse === 'Nothing' ? (
                                        <p className="empty-msg">No banned user yet</p>
                                    ) : (
                                        bannedResponse && bannedResponse.map((item, i) => (
                                            <AdminBanItem refresh_normal={getNormalUser} refresh_banned={getBannedUser} key={i} user_id={item.id} userDetail={item.userDetail} userRole={item.userRole} status='ban' />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        <hr className='ban-hr' />
                        <div className="users-body-container">
                            <p>Not Yet Banned: </p>
                            <div className="users-item-container">
                                {
                                    normalResponse && normalResponse === 'Nothing' ? (
                                        <p className="empty-msg">No users that can be blacklist anymore</p>
                                    ) : (
                                        normalResponse && normalResponse.map((item, i) => (
                                            <AdminBanItem refresh_normal={getNormalUser} refresh_banned={getBannedUser} key={i} user_id={item.id} userDetail={item.userDetail} userRole={item.userRole} status='normal' />
                                        ))
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
        </>
    )
}

export default AdminCustomBan