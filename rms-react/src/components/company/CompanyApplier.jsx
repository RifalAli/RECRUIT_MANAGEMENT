import React from "react";
import CompanyApplierItem from "./CompanyApplierItem";

const CompanyApplier = ({ allAppliers }) => {
    // console.log(allAppliers)
    return (
        <div className="company_applier">
            <div className="container">
                {/* <div className="job-info">
                    <h1>Latest Jobs</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fugit nihil quidem quis vero. Ducimus aliquid quis optio autem quasi.
                    </p>
                </div> */}
                <div className="company_applier__wrapper">
                    {/* <CompanyJobItem index={0}/>
                    <CompanyJobItem index={1}/>
                    <CompanyJobItem index={2}/>
                    <CompanyJobItem index={3}/> */}
                    {
                        allAppliers && allAppliers.map((item, i) => (
                            <CompanyApplierItem key={i} index={i} id={item.id} title={item.title} description={item.description} status={item.status} applicationDate={item.applicationDate} profile={item.profile} company={item.company} job={item.main_job} />
                        ))
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

export default CompanyApplier