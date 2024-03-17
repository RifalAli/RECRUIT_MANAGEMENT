import React from 'react';
import icon from '../../../assets/images/default.png';
import { Link } from 'react-router-dom';

const JobItem = () => {
    return (
        <div className="job__wrapper__card">
            <div className="job__wrapper__card--left">
                <img src={ icon } alt="icon" />
            </div>
            <div className="job__wrapper__card--line"></div>
            <div className="job__wrapper__card--right">
                <div className="job__wrapper__card--right__part-1">
                    <h1>Graphics Design</h1>
                    <p>AAAA</p>
                    <Link to='#'>FULL TIME</Link>
                </div>
                <div className="job__wrapper__card--right__part-2">
                    <i className="fa fa-heart-o"></i>
                </div>
            </div>
        </div>
    );
};

export default JobItem;