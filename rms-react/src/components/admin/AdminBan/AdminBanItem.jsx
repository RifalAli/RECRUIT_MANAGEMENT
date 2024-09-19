import React from 'react'
import { storeApiData } from '../../../api/api'

const AdminBanItem = ( { refresh_normal, refresh_banned, user_id, userDetail, userRole, status } ) => {
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
        </>
    )
}

export default AdminBanItem