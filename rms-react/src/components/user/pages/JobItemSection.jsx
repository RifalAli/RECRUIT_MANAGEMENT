import React from 'react'
import FeaturedJobItem from '../featured-jobs/FeaturedJobItem';
import RegularJobItem from '../regular-jobs/RegularJobItem';

const JobItemSection = ({jobs, condition}) => {
    return (
        <div className='featured_job'>
            <div className="container">
                <div className="featured_job--wrapper">
                    {
                        condition && condition === 'search' ? 
                        
                        jobs && jobs.map((item, i) => (
                            <RegularJobItem
                                title={item.title}
                                type={item.type}
                                company={item.company.name}
                                slug={item.slug}
                                icon={item.icon}
                                description={item.description}
                            />
                        ))

                        :

                        jobs && jobs.map((item, i) => (
                            <RegularJobItem
                                title={item.title}
                                type={item.type}
                                company={item.company[0].name}
                                slug={item.slug}
                                icon={item.icon}
                                description={item.description}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default JobItemSection;