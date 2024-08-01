import React from 'react'
import FeaturedJobItem from '../featured-jobs/FeaturedJobItem';

const JobItemSection = ({jobs, condition}) => {
    return (
        <div className='featured_job'>
            <div className="container">
                <div className="featured_job--wrapper">
                    {
                        condition && condition == 'search' ? 
                        
                        jobs && jobs.map((item, i) => (
                            <FeaturedJobItem
                                title={item.title}
                                type={item.type}
                                company={item.company.name}
                                slug={item.slug}
                                icon={item.icon}
                            />
                        ))

                        :

                        jobs && jobs.map((item, i) => (
                            <FeaturedJobItem
                                title={item.title}
                                type={item.type}
                                company={item.company[0].name}
                                slug={item.slug}
                                icon={item.icon}
                            />
                        ))
                    }
                </div>
                {/* <div className="load-data">
                    <button className='button'>Browse More</button>
                </div> */}
            </div>
        </div>
    )
}

export default JobItemSection;