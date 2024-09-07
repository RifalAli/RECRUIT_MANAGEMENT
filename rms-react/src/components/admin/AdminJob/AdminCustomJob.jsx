import React, { useEffect, useState } from "react";
import sampleIcon from '../../../assets/images/default.png'
import AdminJobItem from '../AdminJob/AdminJobItem'
import { fetchApiData, storeApiData } from "../../../api/api";
import Loader from "../../../services/Loader"

const openModal = () => {
    let modal = document.getElementsByClassName('modal-job')[0];
    modal.style.display = 'block';
}

const closeModal = () => {
    let modal = document.getElementsByClassName('modal-job')[0];
    modal.style.display = 'none';
}

const AdminCustomJob = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)

    const [categoryData, setCategoryData] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    const iniateData = async () => {
        // const getCategory = async () => {
        //     await fetchApiData(`loadCategory`)
        //     .then((response) => console.log(response.data.category))
        //     .then((response) => setCategoryData(response.data.category))
        //     .catch((response) => console.log(response))
        // }

        // const getCompany = async () => {
        //     await fetchApiData(`loadCompany`)
        //     .then((response) => console.log(response.data.company))
        //     .then((response) => setCompanyData(response.data.company))
        //     .catch((response) => console.log(response))
        // }
        const getCategory = async () => {
            const categoryResponse = await fetchApiData(`loadCategory`)
            setCategoryData(categoryResponse.data.category)
        }

        const getCompany = async () => {
            const companyResponse = await fetchApiData(`loadCompany`)
            setCompanyData(companyResponse.data.company)
        }

        getCategory()
        getCompany()
    }

    useEffect(() => {
        iniateData()
    }, [])

    const [company_id, setCompany_id] = useState('')
    const [category_id, setCategory_id] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [jobCloseDate, setJobCloseDate] = useState('')
    const [jobType, setJobType] = useState('')
    const [jobSalary, setJobSalary] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobStatus, setJobStatus] = useState('active')

    const postJob = () => {
        const createJob = async () => {
            await storeApiData(`adminCreateJob`, { company_id, category_id, jobTitle, jobCloseDate, jobType, jobSalary, jobDescription, jobStatus })
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }

        createJob()
        closeModal()
    }

    const [fetchState, setFetchState] = useState(true);
    const [allJobs, setAllJobs] = useState([])
    const [jobCount, setJobCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const totalPageArray = []
    const [pageArray, setPageArray] = useState([])

    const fetchJob = async () => {
        await fetchApiData(`loadJob/${currentPage}`)
        .then((response) => { setAllJobs(response.data.job); setTotalPage(response.data.totalPage); setJobCount(response.data.jobCount); })
        .catch((response) => {})
    }

    const logout = () => {
        localStorage.clear();
        window.location = '/login';
    }

    useEffect(() => {
        const fillData = () => {
            for (let i = 1; i <= totalPage; i++) {
                totalPageArray.push(i)
            }
        }

        fillData()
        setPageArray(totalPageArray)
    }, [totalPage])
    // const [jobData, setJobData] = useState([]);
    // const [newJobDataFormat, setNewJobDataFormat] = useState([]);
    // const [toLoadData, setToLoadData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1)

    // const fetchJob = async () => {
    //     const response = await fetchApiData(`loadJob`)
    //     setJobData(response.data.job)
    // }

    useEffect(() => {
        setFetchState(false);
        fetchJob()
        // iniateData()
        // console.log(jobData)
        setTimeout(() => {
            setLoader(false);
        }, 500);
    }, [fetchState, currentPage])

    // function formatJobData() {
    //     let otherTempJobData = [];
    //     let displayCount = 4;
    //     let totalPage = Math.ceil(jobData.length / displayCount);
    //     let page = 0;

    //     for (page; page < totalPage; page++) {
    //         let leftFlag = page * displayCount;
    //         let rightFlag = leftFlag + displayCount;

    //         let tempJob = [];
    //         let tempJobLength = 0;

    //         for (leftFlag; leftFlag < rightFlag; leftFlag++) {
    //             if (jobData[leftFlag] != null) {
    //                 tempJob[tempJobLength] = jobData[leftFlag];
    //                 ++tempJobLength;
    //             }
    //         }

    //         otherTempJobData[page] = tempJob;
    //     }

    //     setNewJobDataFormat(otherTempJobData)
    // }

    // useEffect(() => {
    //     formatJobData()
    //     // console.log(newJobDataFormat)
    //     // console.log("a")
    // }, [jobData])

    // function movePage() {
    //     setToLoadData(newJobDataFormat[currentPage-1])
    //     // console.log(toLoadData)
    // }

    // useEffect(() => {
    //     movePage()
    //     // console.log(currentPage)
    //     // console.log(toLoadData)
    // }, [jobData, currentPage])

    // console.log(currentPage)
    // console.log(toLoadData)

    // function calculateToLoadData() {
    //     // setToLoadData(jobData[1], jobData[2]);
    //     setToLoadData(Array.prototype.concat(jobData[0], jobData[1], jobData[2], jobData[3]))
    // }

    // useEffect(() => {
    //     calculateToLoadData()
    //     console.log(toLoadData)
    // }, [jobData])

    useEffect(() => {
        if (doRefresh) {
            setTimeout(() => {
                window.location.reload()
                setDoRefresh(!doRefresh)
            }, 2000)
        }

    }, [doRefresh])

    return (
        <>
            {
                loader ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>
                        <section className="admin">
            <div className="container">
                <div className="job-div">
                    <div className="info">
                        <h1>Job</h1>
                        <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                <span>Add Job</span>
                            </div>
                        </button>
                    </div>
                    </div>
                    <p className="pageMsg">Page {currentPage} of {totalPage} with total of {jobCount} jobs</p>
                    <div className="job__wrapper">
                        {
                            // toLoadData && toLoadData.map((item, i) => (
                            //     <AdminJobItem key={i} index={i} id={item.id} title={item.title} closeDate={item.closeDate} type={item.type} salary={item.salary} description={item.description} slug={item.slug} icon={item.icon} status={item.status} company={item.company[0]} cat_id={item.cat_id}/>
                            // ))
                            allJobs && allJobs.map((item, i) => (
                                <AdminJobItem key={i} index={i} id={item.id} title={item.title} closeDate={item.closeDate} type={item.type} salary={item.salary} description={item.description} slug={item.slug} icon={item.icon} status={item.status} company={item.company[0]} cat_id={item.cat_id}/>
                            ))
                        }
                    </div>
                    <div className="page__wrapper">
                        {
                            // newJobDataFormat && newJobDataFormat.map((item, i) => (
                            //     <button type="button" key={i} value={i+1} onClick={e => setCurrentPage(e.target.value)}>{i+1}</button>
                            // ))
                            pageArray && pageArray.map((item, i) => (
                                <button type='button' className={item == currentPage ? 'button-current' : ''} key={i} value={item} onClick={(e) => setCurrentPage(e.target.value)}>{item}</button>
                            ))
                        }
                    </div>
                </div>
            <button className='btn-logout button' type='button' onClick={logout}>LOGOUT</button>
            </div>

            <div className="modal modal-job">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="company">Company: </label>
                                <select className='form-control' value={company_id} onChange={(e)=>setCompany_id(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    {
                                        companyData && companyData.map((item, i) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="title">Title: </label>
                                <input type="text" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} className='form-control' name="title" placeholder='Job Title'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="salary">Salary: </label>
                                <input type="text" value={jobSalary} onChange={(e)=>setJobSalary(e.target.value)} className='form-control' name="salary" placeholder='Job Salary'/>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="expire_at">Close Date: </label>
                                <input type="date" value={jobCloseDate} onChange={(e)=>setJobCloseDate(e.target.value)} className='form-control' name="expire_at" placeholder='close date'/>
                            </div> */}
                            <div className='form-row'>
                                <label htmlFor="expire_at">Expire at: </label>
                                <input type="datetime-local" value={jobCloseDate} onChange={(e)=>setJobCloseDate(e.target.value)} className='form-control' name="expire_at" placeholder='close date'/>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} className='form-control' name="address" placeholder='Job Description'/>
                            </div> */}
                            <div className='form-row'>
                            <label htmlFor="description">Description: </label>
                            <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="category">Category: </label>
                                <select className='form-control' value={category_id} onChange={(e)=>setCategory_id(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    {
                                        categoryData && categoryData.map((item, i) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="type">Type: </label>
                                <select className='form-control' value={jobType} onChange={(e)=>setJobType(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    <option value='full time'>full time</option>
                                    <option value='part time'>part time</option>
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={jobStatus} onChange={(e)=>setJobStatus(e.target.value)}>
                                    <option value='active'>active</option>
                                    <option value='inactive'>inactive</option>
                                </select>
                            </div>
                            <div className='button-div'>
                                <button type='button' onClick={postJob} className="button">
                                    <div>
                                        <span>Create Job</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeModal} className="button button-cancel">
                                    <div>
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
                    </>
                )
            }
        </>
    )
}

export default AdminCustomJob