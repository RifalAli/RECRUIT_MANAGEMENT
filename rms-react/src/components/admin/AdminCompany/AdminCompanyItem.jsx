import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../../assets/images/default.png'
import { storeApiData } from "../../../api/api";

const AdminCompanyItem = ({index, id, name, slug, user_id, usersName, usersEmail, usersStatus, location, description, image, job_count, verify}) => {
    const [dropdownState, setDropdownState] = useState(false)
    const [doRefresh, setDoRefresh] = useState(false)

    const toggleDropdown = () => {
        let dropdown = document.getElementsByClassName('company__wrapper__card--right__dropdown')[index];
        if (dropdownState) {
            dropdown.style.display = 'none';
        }else {
            dropdown.style.display = 'block';
        }

        setDropdownState(!dropdownState);
    }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('active')
    const [companyName, setCompanyName] = useState('')
    const [companyLocation, setCompanyLocation] = useState('')
    const [companyDescription, setCompanyDescription] = useState('')

    const [companyVerify, setCompanyVerify] = useState('')

    const closeModal = () => {
        let modal = document.getElementsByClassName('company-child-modal')[index];
        modal.style.display = 'none';

        setUsername('')
        setCompanyName('')
    }

    const openModal = () => {
        const insertCompanyName = () => {
            setUsername(usersName)
            setEmail(usersEmail)
            setStatus(usersStatus)
            setCompanyName(name)
            setCompanyLocation(location)
            setCompanyDescription(description)

            if (verify === 0) {
                setCompanyVerify(verify)
            }
        }

        const showModal = () => {
            let modal = document.getElementsByClassName('company-child-modal')[index]
            modal.style.display = 'block'
        }

        insertCompanyName()
        showModal()
    }

    const applyCompanyChanges = () => {
        const editCompany = async () => {
            await storeApiData(`adminEditCompany/${id}`, {username, email, status, companyName, companyLocation, companyDescription, companyVerify})
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }
        
        editCompany()
        closeModal()
    }

    console.log(companyVerify)

    const companyDeleteHandler = async () => {
        await storeApiData(`adminDeleteCompany/${user_id}/${id}`)
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
        // <div className="company__wrapper__card">
        //     <div className="company__wrapper__card--left">
        //         <img src={ icon } alt="icon" />
        //     </div>
        //     <div className="company__wrapper__card--line"></div>
        //     <div className="company__wrapper__card--right">
        //         <div className="company__wrapper__card--right__part-1">
        //             <h1>{title}</h1>
        //             <p>{job}</p>
        //             <Link className={type === "full time" ? "full-time" : "half-time"} to={`/job-details/${slug}`}>{type}</Link>
        //         </div>
        //         <div className="company__wrapper__card--right__part-2">
        //             <i className="fa fa-heart-o"></i>
        //         </div>
        //     </div>
        // </div>

        <section>
            <div className="company__wrapper__card">
            <div className="company__wrapper__card--left">
                <img src={ image } alt="icon" />
            </div>
            <div className="company__wrapper__card--line"></div>
            <div className="company__wrapper__card--right">
                <div className="company__wrapper__card--right__part-1">
                    <h1>{name}</h1>
                    <p>{location}</p>
                    {/* <Link className={type === "full time" ? "full-time" : "half-time"} to={`/job-details/abcdefghi`}>full time</Link> */}
                </div>
                <div className="company__wrapper__card--right__part-2">
                    <i className="fa fa-caret-down" onClick={toggleDropdown}></i>
                </div>
                <ul className="company__wrapper__card--right__dropdown">
                    <li>
                        <button type="button" onClick={openModal} className="company__wrapper__card--right__dropdown_item"><i className="fa fa-pencil fa-fw"></i><span>Edit</span></button>
                    </li>
                    <li>
                        <button type="button" onClick={companyDeleteHandler}  className="company__wrapper__card--right__dropdown_item"><i className="fa fa-trash-o fa-fw"></i><span>Delete</span></button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="company-child-modal">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="name">Username: </label>
                                <input type="text" className='form-control' name="name" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="text" className='form-control' name="email" placeholder='Compamy Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={status} onChange={(e)=>setStatus(e.target.value)}>
                                    <option value='active'>active</option>
                                    <option value='inactive'>inactive</option>
                                </select>
                            </div>
                            {
                                verify === 0 ? (
                                    <>
                                        <div className='form-row'>
                                            <label htmlFor="verify">Verification: </label>
                                            <select className='form-control' value={companyVerify} onChange={(e)=>setCompanyVerify(e.target.value)}>
                                                <option value={0}>Unverify</option>
                                                <option value={1}>Verify</option>
                                            </select>
                                        </div>
                                    </>

                                ) : (
                                    <></>
                                )
                            }
                            <div className='form-row'>
                                <label htmlFor="companyName">Company Name: </label>
                                <input type="text" className='form-control' name="companyName" placeholder='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="companyLocation">Company Location: </label>
                                <input type="text" className='form-control' name="companyLocation" placeholder='Company Location' value={companyLocation} onChange={(e) => setCompanyLocation(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="companyDescription">Company Description: </label>
                                <input type="text" className='form-control' name="companyDescription" placeholder='Company Description' value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)}/>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={applyCompanyChanges}>
                                    <div>
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Save Changes</span>
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

export default AdminCompanyItem