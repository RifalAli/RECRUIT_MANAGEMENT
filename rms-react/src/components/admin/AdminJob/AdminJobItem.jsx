import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../../assets/images/default.png'
import { fetchApiData, storeApiData } from "../../../api/api";

const AdminJobItem = ({index, id, title, closeDate, type, salary, description, slug, icon, status, company, cat_id}) => {
    const [dropdownState, setDropdownState] = useState(false)
    const [doRefresh, setDoRefresh] = useState(false)

    const toggleDropdown = () => {
        let dropdown = document.getElementsByClassName('job__wrapper__card--right__dropdown')[index];
        if (dropdownState) {
            dropdown.style.display = 'none';
        }else {
            dropdown.style.display = 'block';
        }

        setDropdownState(!dropdownState);
    }

    const [categoryData, setCategoryData] = useState([]);
    const [companyData, setCompanyData] = useState([]);

    const iniateData = async () => {
        const getCategory = async () => {
            const categoryResponse = await fetchApiData(`loadCategory`)
            setCategoryData(categoryResponse?.data?.category)
        }

        const getCompany = async () => {
            const companyResponse = await fetchApiData(`loadCompany`)
            setCompanyData(companyResponse?.data?.company)
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
    const [jobImageUrl, setJobImageUrl] = useState('')

    const [jobImage, setJobImage] = useState(null)

    const closeModal = () => {
        let modal = document.getElementsByClassName('job-child-modal')[index];
        modal.style.display = 'none';

        setCompany_id('')
        setCategory_id('')
    }

    const openModal = () => {
        const insertCompanyName = () => {
            const formatDate = (dateString) => {
                const [datePart, timePart] = dateString.split(' ')
                const [year, month, day] = datePart.split('-')
                const [hour, minute, second] = timePart.split(':')
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`
            }

            setCompany_id(company.id)
            setCategory_id(cat_id)
            setJobTitle(title)
            setJobCloseDate(formatDate(closeDate))
            setJobType(type)
            setJobSalary(salary)
            setJobDescription(description)
            setJobStatus(status)
            setJobImageUrl(icon)
        }

        const showModal = () => {
            let modal = document.getElementsByClassName('job-child-modal')[index]
            modal.style.display = 'block'
        }

        insertCompanyName()
        showModal()
    }

    const applyJobChanges = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('company_id', company_id)
        formData.append('category_id', category_id)
        formData.append('jobTitle', jobTitle)
        formData.append('jobCloseDate', jobCloseDate)
        formData.append('jobType', jobType)
        formData.append('jobSalary', jobSalary)
        formData.append('jobDescription', jobDescription)
        formData.append('jobStatus', jobStatus)
        formData.append('jobImage', jobImage)

        const editJob = async () => {
            await storeApiData(`adminEditJob/${id}`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }
        
        editJob()
        closeModal()
    }

    const jobDeleteHandler = async () => {
        await storeApiData(`adminDeleteJob/${id}`)
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

    return (
        <section>
        <div className="job__wrapper__card">
            <div className="job__wrapper__card--left">
                <img src={ icon } alt="icon" />
            </div>
            <div className="job__wrapper__card--line"></div>
            <div className="job__wrapper__card--right">
                <div className="job__wrapper__card--right__part-1">
                    <h1>{title}</h1>
                    <p>{company?.name}</p>
                    <Link className={status === "active" ? "full-time" : "half-time"} to={`/job-details/${slug}`}>{status} - {type}</Link>
                </div>
                <div className="job__wrapper__card--right__part-2">
                    <i className="fa fa-caret-down" onClick={toggleDropdown}></i>
                </div>
                <ul className="job__wrapper__card--right__dropdown">
                    <li>
                        <button type="button" onClick={openModal} className="job__wrapper__card--right__dropdown_item"><i className="fa fa-pencil fa-fw"></i><span>Edit</span></button>
                    </li>
                    <li>
                        <button type="button" onClick={jobDeleteHandler} className="job__wrapper__card--right__dropdown_item"><i className="fa fa-trash-o fa-fw"></i><span>Delete</span></button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="modal job-child-modal">
                <div className="modal-container">
                   <div className="photo">
                        <img src={jobImageUrl} alt="sample" />
                        <input type='file' onChange={(e) => setJobImage(e.target.files[0])} className='btn-image-change'></input>
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
                            <div className='form-row'>
                                <label htmlFor="expire_at">Expire at: </label>
                                <input type="datetime-local" value={jobCloseDate} onChange={(e)=>setJobCloseDate(e.target.value)} className='form-control' name="expire_at" placeholder='close date'/>
                            </div>
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
                                <button type='button' onClick={applyJobChanges} className="button">
                                    <div>
                                        <span>Save Changes</span>
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
    )
}

export default AdminJobItem