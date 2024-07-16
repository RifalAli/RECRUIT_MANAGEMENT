import React from 'react';
import FeaturedJobItem from './FeaturedJobItem';

const FeaturedJob = ({featured, similar, name, count}) => {
    return (
        <div className="featured_job">
            <div className="container">
                <div className="featured_job-info">
                    {
                        similar && similar==='featured' ? (
                            <>
                                <h1 className="featured_job-info__heading">Featured Job</h1>
                                <p className="featured_job-info__des">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id natus perferendis nisi enim dignissimos assumenda ullam rerum, quaerat maxime officiis.
                                </p>
                            </>
                        ) : (
                            similar && similar==='similar' ? (
                                <h1 className="featured_job-info__heading">Similar Job</h1>
                            ) : (
                                similar && similar==='category' && count > 0 ? (
                                    <>
                                        <h1 className="featured_job-info__heading">{name} Category</h1>
                                        <p className="featured_job-info__des">Choose your job</p>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="featured_job-info__heading">{name} Category</h1>
                                        <p className="featured_job-info__des">This category is not having any item
                                        </p>
                                    </>
                                )
                            )
                        )
                    }
                </div>
                <div className="featured_job--wrapper">
                    {
                        featured && featured.map((job, i) => (
                            <FeaturedJobItem 
                                key={i}
                                title={job.title}
                                type={job.type}
                                company={job.company[0].name}
                                slug={job.slug}
                                icon={job.icon}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedJob;