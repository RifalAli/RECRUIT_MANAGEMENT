import React from 'react'
import NavBar from '../user/pages/navigation/NavBar'
import CompanyItem from './CompanyItem'
import Footer from '../user/footer/Footer'
import { storeApiData } from '../../api/api'

const CompanyBlacklisItem = ( { refresh_normal, refresh_blacklist, blacklist_id, company_id, user_id, profile, status } ) => {
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
        </>
    )
}

export default CompanyBlacklisItem