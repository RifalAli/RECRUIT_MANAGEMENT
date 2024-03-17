import React from 'react';
import JobItem from './JobItem';

const Jobs = () => {
    return (
        <div className="job">
            <div className="container">
                <div className="job-info">
                    <h1>Latest Jobs</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere fugit nihil quidem quis vero. Ducimus aliquid quis optio autem quasi.
                    </p>
                </div>
                <div className="job__wrapper">
                    <JobItem/>
                    <JobItem/>
                    <JobItem/>
                    <JobItem/>
                </div>
            </div>
        </div>
    );
};

export default Jobs;