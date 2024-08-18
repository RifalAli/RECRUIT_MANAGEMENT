import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchApiData } from '../../../api/api';
import Loader from '../../../services/Loader';
import NavBar from '../pages/navigation/NavBar';
import JobDetailsItem from '../jobs/JobDetailsItem';
import Footer from '../footer/Footer';
import FeaturedJobItem from '../featured-jobs/FeaturedJobItem';
import FeaturedJob from '../featured-jobs/FeaturedJob';

const SameCategory = () => {
    const {slug} = useParams();
    const [loader, setLoader] = useState(true)
    const [job, setJob] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            const fetchData = async() => {
                const response = await fetchApiData(`categories/jobs/${slug}`);
                if (response && response.status && response.status === true) {
                    setJob(response.data);
                }else {
                    console.log(response);
                }
                setLoader(false);
            };
            fetchData();
        }, 300);
    }, [slug]);
    console.log(job && job)
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <NavBar job={job.job} cmp='jobs' />
                    {
                        job.same && job.same ? (
                            <>
                                <FeaturedJob featured={job.same} count={job.same.length} similar={'category'} name={job.categories.name} />
                            </>
                        ) : (
                            <>
                                <div className='no-jobs'>
                                    <h1>Job not Found</h1>
                                    <p>There is no job in this category</p>
                                </div>
                            </>
                        )
                    }

                    <Footer />
                </>
            )}
        </>
    )
}

export default SameCategory