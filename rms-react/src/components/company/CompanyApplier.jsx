import React from "react";
import CompanyApplierItem from "./CompanyApplierItem";

const CompanyApplier = ({ applicationStatus, allAppliers, fetchAllAppliers, fetchArchivedAppliers }) => {
    return (
        <div className="company_applier">
            <div className="container">
                <div className="company_applier__wrapper">
                    {
                        allAppliers && allAppliers.length < 1 ? (
                            <p className="empty-msg">No Job Applier Yet</p>
                        ) : (
                            allAppliers && allAppliers.map((item, i) => (
                                <CompanyApplierItem key={i} index={i} id={item.id} title={item.title} description={item.description} image={item.image} status={item.status} applicationDate={item.applicationDate} profile={item.profile} company={item.company} job={item.main_job} fetchAllAppliers={fetchAllAppliers} applicationStatus={applicationStatus} fetchArchivedAppliers={fetchArchivedAppliers} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CompanyApplier