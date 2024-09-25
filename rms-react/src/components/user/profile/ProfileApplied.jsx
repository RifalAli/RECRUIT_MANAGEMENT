import React from 'react'
import ProfileAppliedItem from './ProfileAppliedItem'

const ProfileApplied = ( {allAppliedJobs, document_url} ) => {
    return (
        <>
            <div className="profile_applied">
                <div className="container">
                    <div className="profile_applied__wrapper">
                    {
                        allAppliedJobs && allAppliedJobs[0] === 'Nothing' ? (
                            <p className='empty-msg'>No Applied Job Yet</p>
                        ) : (
                            allAppliedJobs && allAppliedJobs.map((item, i) => (
                                <ProfileAppliedItem key={i} index={i} id={item.id} title={item.title} description={item.description} document_url={document_url} status={item.status} application_date={item.created_at} profile_id={item.profile_id} company_id={item.company_id} job_id={item.job_id} main_job={item.job[0]} applicationAnswer={item.applicationAnswer[0]} company={item.company[0]}/>
                            ))
                        )
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileApplied