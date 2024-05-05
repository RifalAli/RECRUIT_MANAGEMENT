import React from 'react'
import FeaturedJobItem from '../featured-jobs/FeaturedJobItem';

const JobItemSection = () => {
    return (
        <div className='featured_job'>
            <div className="container">
                <div className="featured_job--wrapper">
                    <FeaturedJobItem
                        title="Hi"
                        type="full time"
                        company="BJIT"
                        slug="slug"
                        icon="demo.icon" />
                    <FeaturedJobItem
                        title="Hi"
                        type="full time"
                        company="BJIT"
                        slug="slug"
                        icon="demo.icon" />
                    <FeaturedJobItem
                        title="Hi"
                        type="full time"
                        company="BJIT"
                        slug="slug"
                        icon="demo.icon" />
                    <FeaturedJobItem
                        title="Hi"
                        type="full time"
                        company="BJIT"
                        slug="slug"
                        icon="demo.icon" />
                    <FeaturedJobItem
                        title="Hi"
                        type="full time"
                        company="BJIT"
                        slug="slug"
                        icon="demo.icon" />
                    <FeaturedJobItem
                        title="Hi"
                        type="full time"
                        company="BJIT"
                        slug="slug"
                        icon="demo.icon" />
                </div>
                <div className="load-data">
                    <button className='button'>Browse More</button>
                </div>
            </div>
        </div>
    )
}

export default JobItemSection;