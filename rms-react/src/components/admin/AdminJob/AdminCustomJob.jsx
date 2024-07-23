import React, { useEffect, useState } from "react";
import sampleIcon from '../../../assets/images/default.png'
import AdminJobItem from '../AdminJob/AdminJobItem'
import { fetchApiData, storeApiData } from "../../../api/api";

const openModal = () => {
    let modal = document.getElementsByClassName('modal-job')[0];
    modal.style.display = 'block';
}

const closeModal = () => {
    let modal = document.getElementsByClassName('modal-job')[0];
    modal.style.display = 'none';
}

const AdminCustomJob = () => {
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
    const [jobCount, setJobCount] = useState('')
    const [jobTag, setJobTag] = useState('')
    const [jobSalary, setJobSalary] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobStatus, setJobStatus] = useState('active')

    const postJob = () => {
        const createJob = async () => {
            await storeApiData(`adminCreateJob`, { company_id, category_id, jobTitle, jobCloseDate, jobType, jobCount, jobTag, jobSalary, jobDescription, jobStatus })
            .then((response)=>console.log(response.data))
            .catch((response)=>console.log(response.data))
        }

        createJob()
        closeModal()
    }

    const [fetchState, setFetchState] = useState(true);
    const [jobData, setJobData] = useState([]);
    const [newJobDataFormat, setNewJobDataFormat] = useState([]);
    const [toLoadData, setToLoadData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    const fetchJob = async () => {
        const response = await fetchApiData(`loadJob`)
        setJobData(response.data.job)
    }

    useEffect(() => {
        setFetchState(false);
        fetchJob()
        // iniateData()
        // console.log(jobData)
    }, [fetchState])

    function formatJobData() {
        let otherTempJobData = [];
        let displayCount = 4;
        let totalPage = Math.ceil(jobData.length / displayCount);
        let page = 0;

        for (page; page < totalPage; page++) {
            let leftFlag = page * displayCount;
            let rightFlag = leftFlag + displayCount;

            let tempJob = [];
            let tempJobLength = 0;

            for (leftFlag; leftFlag < rightFlag; leftFlag++) {
                if (jobData[leftFlag] != null) {
                    tempJob[tempJobLength] = jobData[leftFlag];
                    ++tempJobLength;
                }
            }

            otherTempJobData[page] = tempJob;
        }

        setNewJobDataFormat(otherTempJobData)
    }

    useEffect(() => {
        formatJobData()
        // console.log(newJobDataFormat)
        // console.log("a")
    }, [jobData])

    function movePage() {
        setToLoadData(newJobDataFormat[currentPage-1])
        // console.log(toLoadData)
    }

    useEffect(() => {
        movePage()
        // console.log(currentPage)
        // console.log(toLoadData)
    }, [jobData, currentPage])

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
    return (
        <section className="admin">
            <div className="container">
                <div className="job-div">
                    <div className="info">
                        <h1>Job</h1>
                        <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                {/* <img src='' alt='' height='15px' width='15px'/> */}
                                <span>Add Job</span>
                            </div>
                        </button>
                    </div>
                    </div>
                    <div className="job__wrapper">
                        {/* <AdminJobItem index={0}/>
                        <AdminJobItem index={1}/> */}
                        {
                            // jobData.map((item, i) => (
                            //     <AdminJobItem key={i} index={i} id={item.id} title={item.title} type={item.type} slug={item.slug} icon={item.icon} status={item.status} company={item.company[0]}/>
                            // ))
                        }
                        {
                            toLoadData && toLoadData.map((item, i) => (
                                <AdminJobItem key={i} index={i} id={item.id} title={item.title} closeDate={item.closeDate} type={item.type} count={item.count} tag={item.tag} salary={item.salary} description={item.description} slug={item.slug} icon={item.icon} status={item.status} company={item.company[0]} cat_id={item.cat_id}/>
                            ))
                        }
                    </div>
                    <div className="page__wrapper">
                        {/* <button type="button" value={1} onClick={e => setCurrentPage(e.target.value)}>1</button>
                        <button type="button" value={2} onClick={e => setCurrentPage(e.target.value)}>2</button>
                        <button type="button" value={3} onClick={e => setCurrentPage(e.target.value)}>3</button>
                        <button type="button" value={4} onClick={e => setCurrentPage(e.target.value)}>4</button> */}
                        {
                            // toLoadData && toLoadData.map((item, i) => (
                                //     <button type="button" onClick={setCurrentPage(i+1)}>{i+1}</button>
                            // ))
                            // newJobDataFormat.map((item, i) => (
                            //     <button type="button" onClick={setCurrentPage(i+1)}>{i+1}</button>
                            // ))
                        }
                        {
                            newJobDataFormat && newJobDataFormat.map((item, i) => (
                                <button type="button" key={i} value={i+1} onClick={e => setCurrentPage(e.target.value)}>{i+1}</button>
                            ))
                        }
                    </div>
                    {/*  */}
                </div>
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
                                <label htmlFor="tag">Tag: </label>
                                <input type="text" value={jobTag} onChange={(e)=>setJobTag(e.target.value)} className='form-control' name="tag" placeholder='Job Tag'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="count">Count: </label>
                                <input type="number" value={jobCount} onChange={(e)=>setJobCount(e.target.value)} className='form-control' name="count"  placeholder='People Needed'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="salary">Salary: </label>
                                <input type="text" value={jobSalary} onChange={(e)=>setJobSalary(e.target.value)} className='form-control' name="salary" placeholder='Job Salary'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="close_date">Close Date: </label>
                                <input type="date" value={jobCloseDate} onChange={(e)=>setJobCloseDate(e.target.value)} className='form-control' name="close_date" placeholder='close date'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} className='form-control' name="address" placeholder='Job Description'/>
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
                                    <option value='half time'>half time</option>
                                </select>
                            </div>
                            {/* <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={jobStatus} onChange={(e)=>setJobStatus(e.target.value)}>
                                    <option value='active'>active</option>
                                    <option value='inactive'>inactive</option>
                                </select>
                            </div> */}
                            <div className='button-div'>
                                <button type='button' onClick={postJob} className="button">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Create Job</span>
                                    </div>
                                </button>
                                <button type='button' onClick={closeModal} className="button button-cancel">
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Cancel</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AdminCustomJob