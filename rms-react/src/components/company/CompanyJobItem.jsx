import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../assets/images/default.png'
import { fetchApiData, storeApiData } from "../../api/api";

const CompanyJobItem = ({index, id, title, slug, closeDate, company, description, salary, company_id, type, icon, cat_id, category}) => {
    const [dropdownState, setDropdownState] = useState(false)
    const [doRefresh, setDoRefresh] = useState(false)

    const toggleDropdown = () => {
        // let dropdowns = document.getElementsByClassName('company_job__wrapper__card--right__dropdown');
        // for (let i = 0; i < dropdowns.length; i++) {
        //     dropdowns.item(i).style.display = 'none';
        //     console.log(dropdowns.item(i).dropdownState);
        // }

        let dropdown = document.getElementsByClassName('company_job__wrapper__card--right__dropdown')[index];
        if (dropdownState) {
            dropdown.style.display = 'none';
        }else {
            dropdown.style.display = 'block';
        }

        //1 - 0
        //2 - 1

        // console.log(index)

        setDropdownState(!dropdownState);

        // console.log(dropdownState)
    }

    const jobDeleteHandler = async () => {
        await storeApiData(`companyDeleteJob/${company_id}/${id}`)
        .then((response) => console.log(response))
        .then(setDoRefresh(!doRefresh))
        .catch((response) => console.log(response))
    }

    useEffect(() => {
        if (doRefresh) {
            setTimeout(() => {
                window.location.reload()
                setDoRefresh(!doRefresh)
            }, 2000)
        }

    }, [doRefresh])

    // console.log(company_id)

    //Edit Job
    const closeModal = () => {
        let modal = document.getElementsByClassName('child-modal')[index];
        modal.style.display = 'none';
    
        setJobTitle('')
        setJobCloseDate('')
        setJobSalary('')
        setJobDescription('')
        setJobCategory('')
        setJobType('')
        setJobImageUrl('')
    }

    const applyJobChanges = (e) => {
        e.preventDefault();
        const editJob = async (e) => {

            const formData = new FormData();
            formData.append('jobTitle', jobTitle)
            formData.append('jobSalary', jobSalary)
            formData.append('jobCloseDate', jobCloseDate)
            formData.append('jobCategory', jobCategory)
            formData.append('jobDescription', jobDescription)
            formData.append('jobType', jobType)
            formData.append('image', jobImage)

            await storeApiData(`companyEditJob/${company_id}/${id}`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }

        editJob()
        closeModal()
    }

    const openModal = () => {
        const insertJobData = async () => {
            const formatDate = (dateString) => {
                const [datePart, timePart] = dateString.split(' ')
                const [year, month, day] = datePart.split('-')
                const [hour, minute, second] = timePart.split(':')
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`
            }

            setJobTitle(title)
            setJobSalary(salary)
            setJobCloseDate(formatDate(closeDate))
            setJobDescription(description)
            setJobType(type)
            setJobImageUrl(icon)

            // console.log(formatDate(closeDate))
            // console.log(closeDate)

            if (category == null) return
            // setJobCategory(category[cat_id-1].name)
            setJobCategory(cat_id)
        }

        const showModal = () => {
            let modal = document.getElementsByClassName('child-modal')[index];
            modal.style.display = 'block';
        }

        insertJobData()
        showModal()
    }

    const [jobTitle, setJobTitle] = useState(title)
    const [jobSalary, setJobSalary] = useState('')
    const [jobCloseDate, setJobCloseDate] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobStatus, setJobStatus] = useState('active');
    const [jobType, setJobType] = useState('full time');
    const [jobCategory, setJobCategory] = useState('');
    const [jobImageUrl, setJobImageUrl] = useState('')

    const [jobImage, setJobImage] = useState(null);

    const [jobExpireDate, setJobExpireDate] = useState('')
    const [jobExpireTime, setJobExpireTime] = useState('')

    return (
        // <div className="job__wrapper__card">
        //     <div className="job__wrapper__card--left">
        //         <img src={ icon } alt="icon" />
        //     </div>
        //     <div className="job__wrapper__card--line"></div>
        //     <div className="job__wrapper__card--right">
        //         <div className="job__wrapper__card--right__part-1">
        //             <h1>{title}</h1>
        //             <p>{company}</p>
        //             <Link className={type === "full time" ? "full-time" : "half-time"} to={`/job-details/${slug}`}>{type}</Link>
        //         </div>
        //         <div className="job__wrapper__card--right__part-2">
        //             <i className="fa fa-heart-o"></i>
        //         </div>
        //     </div>
        // </div>
        <section>
            <div className="company_job__wrapper__card">
                <div className="company_job__wrapper__card--left">
                    <img src={ icon } alt="icon" />
                </div>
                <div className="company_job__wrapper__card--line"></div>
                <div className="company_job__wrapper__card--right">
                    <div className="company_job__wrapper__card--right__part-1">
                        <h1>{title}</h1>
                        <p>{company}</p>
                        <Link className={type === "full time" ? "full-time" : "half-time"} to={`/job-details/${slug}`}>{type}</Link>
                    </div>
                    <div className="company_job__wrapper__card--right__part-2">
                        <i className="fa fa-caret-down" onClick={toggleDropdown}></i>
                    </div>
                    <ul className="company_job__wrapper__card--right__dropdown">
                        <li>
                            <button type="button" onClick={openModal}  className="company_job__wrapper__card--right__dropdown_item"><i className="fa fa-pencil fa-fw"></i><span>Edit</span></button>
                        </li>
                        <li>
                            <button type="button" onClick={jobDeleteHandler} className="company_job__wrapper__card--right__dropdown_item"><i className="fa fa-trash-o fa-fw"></i><span>Delete</span></button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="child-modal">
                <div className="modal-container">
                   <div className="photo">
                        <img src={jobImageUrl} alt="sample" />
                        <input type='file' onChange={(e) => setJobImage(e.target.files[0])} className='btn-image-change'></input>
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="title">Title: </label>
                                <input type="text" className='form-control' name="title" placeholder='Job Title' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="salary">Salary: </label>
                                <input type="text" className='form-control' name="salary" placeholder='Job Salary' value={jobSalary} onChange={(e) => setJobSalary(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="expire_at">Expire at: </label>
                                <input type="datetime-local" className='form-control' name="expire_at" placeholder='close date' value={jobCloseDate} onChange={(e) => setJobCloseDate(e.target.value)}/>
                            </div>
                            {/* <div className='form-row-datetime'>
                                <label htmlFor="expire_at">Expire at: </label>
                                <div>
                                    <label htmlFor="">Date: </label>
                                    <input type="date" className='form-control' name="expire_at" placeholder='close date' value={jobExpireDate} onChange={(e) => setJobExpireDate(e.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="">Time: </label>
                                    <input type="time" className='form-control' name="expire_at" placeholder='close date' value={jobExpireTime} onChange={(e) => setJobExpireTime(e.target.value)}/>
                                </div>
                            </div> */}
                            {/* <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <input type="text" className='form-control' name="address" placeholder='Job Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
                            </div> */}
                            <div className='form-row'>
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Description' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="category">Category: </label>
                                <select className='form-control' value={jobCategory} onChange={(e)=>setJobCategory(e.target.value)}>
                                    <option value=''>Select an Option</option>
                                    {
                                        // category.map((item) => (
                                        //     <option key={item.id} value={item.name}>{item.name}</option>
                                        // ))
                                        category.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                        // reamData.map(item => {
                                        //     <option key={item.id} value={item.name}>{item.name}</option>
                                        // })
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="type">Type: </label>
                                <select className='form-control' value={jobType} onChange={(e)=>setJobType(e.target.value)}>
                                    <option value='full time'>full time</option>
                                    <option value='part time'>part time</option>
                                </select>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={applyJobChanges}>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Apply Changes</span>
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

export default CompanyJobItem