import React, { useEffect, useState } from 'react'
import NavBar from '../pages/navigation/NavBar'
import Footer from '../footer/Footer'
import JobDetailsItem from './JobDetailsItem'
import Loader from '../../../services/Loader'
import { useParams } from 'react-router-dom'
import { fetchApiData } from '../../../api/api'

const JobDetails = () => {
    const {slug} = useParams();
    const [loader, setLoader] = useState(true);
    const [job, setJob] = useState([]);

    const [refreshed, setRefreshed] = useState(true)

    useEffect(() => {
        if (refreshed) {
            setRefreshed(false)
        }

        if (!refreshed) {
            window.location.reload();
        }

        const fetchData = async () => {
            const response = await fetchApiData(`home/${slug}`);
            if (response && response.status && response.status === true) {
                setJob(response.data);
            }else {
                console.log(response);
            }
        }
        fetchData();
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, [slug]);
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <NavBar job={job.job} cmp='jobs' />
                    <JobDetailsItem similar={job.similar} job={job.job}/>
                    <Footer />
                </>
            )}
        </>
    )
}

export default JobDetails