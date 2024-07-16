import React, { useEffect, useState } from "react";
import sampleIcon from '../../../assets/images/default.png'
import AdminCompanyItem from "./AdminCompanyItem";
import { fetchApiData, storeApiData } from "../../../api/api";

const openModal = () => {
    let modal = document.getElementsByClassName('modal-company')[0];
    modal.style.display = 'block';
}

const closeModal = () => {
    let modal = document.getElementsByClassName('modal-company')[0];
    modal.style.display = 'none';
}

const AdminCustomCompany = () => {

    const [fetchState, setFetchState] = useState(true);
    const [companyData, setCompanyData] = useState([]);

    const fetchCategory = async () => {
        const response = await fetchApiData(`loadCompany`)
        setCompanyData(response.data.company)
    }

    useEffect(() => {
        setFetchState(false);
        fetchCategory()
        console.log(companyData)
    }, [fetchState])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('active');
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    const postCompany = () => {
        const createJob = async () => {
            await storeApiData(`adminCreateCompany`, { name, email, password, confirmPassword, status, companyName, companyLocation, companyDescription })
            .then((response)=>console.log(response.data))
            .catch((response)=>console.log(response.data))
        }

        createJob()
        closeModal()
    }

    return (
        <section className="admin">
            <div className="container">
                <div className='company-div'>
                    <div className="info">
                        <h1>Company</h1>
                        <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                {/* <img src='' alt='' height='15px' width='15px'/> */}
                                <span>Add Company</span>
                            </div>
                        </button>
                    </div>
                    </div>
                    <div className="company__wrapper">
                        {/* <AdminCompanyItem index={0}/>
                        <AdminCompanyItem index={1}/> */}
                        {
                            companyData.map((item, i) => (
                                <AdminCompanyItem key={i} index={i} id={item.id} name={item.name} usersName={item.username} usersEmail={item.email} usersStatus={item.status} slug={item.slug} user_id={item.user_id} location={item.location} description={item.description} image={item.image} job_count={item.job_count}/>
                            ))
                        }
                    </div>
                    {/* Job that belong to this company are here */}
                    <>
                        {/* <CompanyJob /> */}
                        {/* <JobItem title='Check' slug='a' type='full time' company='PT Tes' icon='http://localhost:8000/files/jobs/default.png'/> */}
                        {/* <FeaturedJobItem title='Check' slug='a' type='full time' company='PT Tes' icon='http://localhost:8000/files/jobs/default.png'/> */}
                    </>
                </div>
            </div>

            <div className="modal modal-company">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="name">Username: </label>
                                <input type="text" className='form-control' name="name" placeholder='Company Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="name">Company Name: </label>
                                <input type="text" className='form-control' name="name" placeholder='Company Name' value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="name">Company Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='Company Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="name">Company Password: </label>
                                <input type="password" className='form-control' name="Company Password" placeholder='Company Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="name">Confirm Password: </label>
                                <input type="password" className='form-control' name="confirm Password" placeholder='Company Email' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={status} onChange={(e)=>setStatus(e.target.value)}>
                                    <option value='active'>active</option>
                                    <option value='inactive'>inactive</option>
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="location">Company Location: </label>
                                <input type="text" className='form-control' name="location" placeholder='Company Location' value={companyLocation} onChange={(e)=>setCompanyLocation(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="description">Company Description: </label>
                                <input type="text" className='form-control' name="description" placeholder='Company Description' value={companyDescription} onChange={(e)=>setCompanyDescription(e.target.value)}/>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={postCompany}>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Create Company</span>
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

export default AdminCustomCompany