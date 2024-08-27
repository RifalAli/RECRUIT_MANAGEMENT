import React from "react";
import CompanyJobItem from "./CompanyJobItem";

const CompanyJob = ({ allJobs, category }) => {
    return (
        <div className="company_job">
            <div className="container">
                {/* <div className="job-info">
                    <h1>Latest Jobs</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fugit nihil quidem quis vero. Ducimus aliquid quis optio autem quasi.
                    </p>
                </div> */}
                <div className="company_job__wrapper">
                    {/* <CompanyJobItem index={0}/>
                    <CompanyJobItem index={1}/>
                    <CompanyJobItem index={2}/>
                    <CompanyJobItem index={3}/> */}
                    {
                        // allJobs.map((item, i) => (
                        //     <CompanyJobItem key={i} index={i} id={item.id} title={item.title} slug={item.slug} closeDate={item.expire_at} company={item.company.name} description={item.description} salary={item.salary} company_id={item.company_id} type={item.type} icon={item.icon} cat_id={item.cat_id} category={category} />
                        // ))
                    }
                    {
                        allJobs && allJobs.length < 1 ? (
                            <p className="empty-msg">No Uploaded Job Yet</p>
                        ) : (
                            allJobs.map((item, i) => (
                            <CompanyJobItem key={i} index={i} id={item.id} title={item.title} slug={item.slug} closeDate={item.expire_at} company={item.company.name} description={item.description} salary={item.salary} company_id={item.company_id} type={item.type} icon={item.icon} cat_id={item.cat_id} category={category} />
                            )) 
                        )
                    }
                    {
                        // latest && latest.map((job, i) => (
                        //     <CompanyJobItem
                        //         key={i}
                        //         title={job.title}
                        //         type={job.type}
                        //         company={job.company}
                        //         slug={job.slug}
                        //         icon={job.icon}
                        //     />
                        // ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CompanyJob