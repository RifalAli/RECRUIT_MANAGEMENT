import React, { useEffect, useState } from "react";
import sampleIcon from '../../../assets/images/default.png'
import AdminCompanyItem from "./AdminCompanyItem";
import { fetchApiData, storeApiData } from "../../../api/api";
import Loader from "../../../services/Loader"

const openModal = () => {
    let modal = document.getElementsByClassName('modal-company')[0];
    modal.style.display = 'block';
}

const closeModal = () => {
    let modal = document.getElementsByClassName('modal-company')[0];
    modal.style.display = 'none';
}

const AdminCustomCompany = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)

    const [fetchState, setFetchState] = useState(true);
    const [companyData, setCompanyData] = useState([]);

    const fetchCategory = async () => {
        const response = await fetchApiData(`loadCompany`)
        setCompanyData(response.data.company)
    }

    useEffect(() => {
        setFetchState(false);
        fetchCategory()
        // console.log(companyData)
        setTimeout(() => {
            setLoader(false);
        }, 5000);
    }, [fetchState])

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('active');
    const [companyName, setCompanyName] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    const [image, setImage] = useState(null)

    const postCompany = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        formData.append('status', status)
        formData.append('companyName', companyName)
        formData.append('companyLocation', companyLocation)
        formData.append('companyDescription', companyDescription)
        formData.append('image', image)
        
        const createJob = async () => {
            await storeApiData(`adminCreateCompany`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }

        createJob()
        closeModal()
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
                <div className='company-div'>
                    <div className="info">
                        <h1>Company</h1>
                        <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                <span>Add Company</span>
                            </div>
                        </button>
                    </div>
                    </div>
                    <div className="company__wrapper">
                        {
                            companyData.map((item, i) => (
                                <AdminCompanyItem key={i} index={i} id={item.id} name={item.name} usersName={item.username} usersEmail={item.email} usersStatus={item.status} slug={item.slug} user_id={item.user_id} location={item.location} description={item.description} image={item.image} job_count={item.job_count} verify={item.verify}/>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="modal modal-company">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                        <input type='file' onChange={(e) => setImage(e.target.files[0])} className='btn-image-change'></input>
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="username">Username: </label>
                                <input type="text" className='form-control' name="username" placeholder='Username' value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="name">Company Name: </label>
                                <input type="text" className='form-control' name="name" placeholder='Company Name' value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Company Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='Company Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="password">Company Password: </label>
                                <input type="password" className='form-control' name="password" placeholder='Company Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="confirmPassword">Confirm Password: </label>
                                <input type="password" className='form-control' name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
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
                                <label htmlFor="description">Description: </label>
                                <textarea className='form-control' name="description" id="text-area" cols="30" rows="20" placeholder='Company Description' value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}></textarea>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={postCompany}>
                                    <div>
                                        <span>Create Company</span>
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

export default AdminCustomCompany