import React from 'react';
import iconDefault from '../../../assets/images/default.png'
import { Link } from 'react-router-dom';

const RegularJobItem = ({title, slug, type, company, icon, description}) => {
    return (
        <Link to={`/job-details/${slug}`} >
            <div className="featured_job--wrapper__card">
                <div className="featured_job--wrapper__card--left">
                    <img src={icon} alt="icon" width="100px" height="100px"/>
                </div>
                <div className="featured_job--wrapper__card--right">
                    <p className={type === "full time" ? "mark full-time" : "mark half-time"}>
                        {type}
                    </p>
                    <h1>{title}</h1>
                    <p className='text-black'>{company}</p>
                    <p className='preview-description'>{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default RegularJobItem;