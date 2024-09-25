import React from 'react';
import iconDefault from '../../../assets/images/default.png'
import { Link } from 'react-router-dom';

const FeaturedJobItem = ({title, slug, type, company, icon}) => {
    return (
        <Link to={`/job-details/${slug}`} >
            <div className="featured_job--wrapper__card">
                <div className="featured_job--wrapper__card--left">
                    <img src={icon} alt="icon" width="100px" height="100px"/>
                </div>
                <div className="featured_job--wrapper__card--right">
                    <h1>{title}</h1>
                    <p className='text-black'>{company}</p>
                    <p className={type === "full time" ? "full-time" : "half-time"}>
                        {type}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedJobItem;