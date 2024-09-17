import React from 'react'
import { storeApiData } from '../../../api/api'

const AdminBanItem = ( { refresh_normal, refresh_banned, user_id, userDetail, userRole, status } ) => {
    // console.log(company_id, user_id)
    // console.log(user_id, user_profile)
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
                {/* <p>1</p> */}
                {
                    userRole === 'profile' ? (
                        <p>{userDetail.fullname}</p>
                    ) : (
                        <p>{userDetail.name}</p>
                    )
                }
                {/* Button for user & profile detail, placed before the action button */}
                {
                    status === 'normal' ? (
                        <>
                            <button className='ban-button' onClick={banUser} type='button'>Ban</button>
                        </>
                    ) : (
                        <>
                            {/* <p>{blacklist_id}</p> */}
                            <button className='unban-button' onClick={unbanUser} type='button'>Unban</button>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default AdminBanItem