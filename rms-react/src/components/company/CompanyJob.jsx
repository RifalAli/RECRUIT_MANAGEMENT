import React from "react";
import CompanyJobItem from "./CompanyJobItem";

const CompanyJob = ({ allJobs, category }) => {
    return (
        <div className="company_job">
            <div className="container">
                <div className="company_job__wrapper">
                    {
                        allJobs && allJobs === 'Nothing' ? (
                            <p className="empty-msg">No Published Job Yet</p>
                        ) : (
                            allJobs.map((item, i) => (
                            <CompanyJobItem key={i} index={i} id={item.id} title={item.title} slug={item.slug} closeDate={item.expire_at} company={item.company.name} description={item.description} salary={item.salary} company_id={item.company_id} type={item.type} icon={item.icon} cat_id={item.cat_id} category={category} />
                            )) 
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CompanyJob