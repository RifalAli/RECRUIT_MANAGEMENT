import React from 'react'
import NavBar from '../pages/navigation/NavBar'
import ProfileItem from './ProfileItem'
import Footer from '../footer/Footer'
import CompanyApplierItem from '../../company/CompanyApplierItem'
import ProfileAppliedItem from './ProfileAppliedItem'

const ProfileApplied = ( {allAppliedJobs} ) => {
    // console.log(allAppliedJobs)

    // console.log(allAppliedJobs[0].job[0].title)
    // console.log(allAppliedJobs[0].applicationAnswer)
    return (
        <>
            <div className="profile_applied">
                <div className="container">
                    <div className="profile_applied__wrapper">
                    {
                        // allAppliers && allAppliers.map((item, i) => (
                        //     <CompanyApplierItem key={i} index={i} id={item.id} title={item.title} description={item.description} document={item.document_url} status={item.status} applicationDate={item.applicationDate} profile={item.profile} company={item.company} job={item.main_job} />
                        // ))

                        allAppliedJobs && allAppliedJobs.map((item, i) => (
                            <ProfileAppliedItem key={i} index={i} id={item.id} title={item.title} description={item.description} document_url={item.document_url} status={item.status} application_date={item.applicationDate} profile_id={item.profile_id} company_id={item.company_id} job_id={item.job_id} main_job={item.job[0]} applicationAnswer={item.applicationAnswer[0]}/>
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileApplied