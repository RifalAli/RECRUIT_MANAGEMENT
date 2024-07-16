import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sampleIcon from '../../../assets/images/default.png'
import { storeApiData } from "../../../api/api";

const AdminCategoryItem = ({index, id, name, slug, icon, status, job_count}) => {
    const [dropdownState, setDropdownState] = useState(false)
    const [doRefresh, setDoRefresh] = useState(false)

    const toggleDropdown = () => {
        let dropdown = document.getElementsByClassName('category__wrapper__card--right__dropdown')[index];
        if (dropdownState) {
            dropdown.style.display = 'none';
        }else {
            dropdown.style.display = 'block';
        }

        setDropdownState(!dropdownState);
    }

    const [categoryName, setCategoryName] = useState(name)
    const [categoryStatus, setCategoryStatus] = useState(status)

    const closeModal = () => {
        let modal = document.getElementsByClassName('category-child-modal')[index];
        modal.style.display = 'none';

        setCategoryName('')
        setCategoryStatus('')
    }

    const openModal = () => {
        const insertCategoryData = () => {
            setCategoryName(name)
            setCategoryStatus(status)
        }

        const showModal = () => {
            let modal = document.getElementsByClassName('category-child-modal')[index]
            modal.style.display = 'block'
        }

        insertCategoryData()
        showModal()
    }

    const applyCategoryChanges = () => {
        const editCategory = async () => {
            await storeApiData(`adminEditCategory/${id}`, {categoryName, categoryStatus})
            .then((response)=>console.log(response.data))
            .catch((response)=>console.log(response.data))
        }
        
        editCategory()
        closeModal()
    }

    const categDeleteHandler = async () => {
        await storeApiData(`adminDeleteCategory/${id}`)
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

        <div className="category__wrapper__card">
            <div className="category__wrapper__card--left">
                <img src={ icon } alt="icon" />
            </div>
            <div className="category__wrapper__card--line"></div>
            <div className="category__wrapper__card--right">
                <div className="category__wrapper__card--right__part-1">
                    <h1>{name}</h1>
                    <p>{job_count}</p>
                    <Link className={status === "active" ? "full-time" : "half-time"} to={`/categories/jobs/${slug}`}>{status}</Link>
                </div>
                <div className="category__wrapper__card--right__part-2">
                    <i className="fa fa-caret-down" onClick={toggleDropdown}></i>
                </div>
                <ul className="category__wrapper__card--right__dropdown">
                    <li>
                        <button type="button" onClick={openModal}  className="category__wrapper__card--right__dropdown_item"><i className="fa fa-pencil fa-fw"></i><span>Edit</span></button>
                    </li>
                    <li>
                        <button type="button" onClick={categDeleteHandler} className="category__wrapper__card--right__dropdown_item"><i className="fa fa-trash-o fa-fw"></i><span>Delete</span></button>
                    </li>
                </ul>
            </div>
        </div>

        <div className="category-child-modal">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="name">Category Name: </label>
                                <input type="text" className='form-control' name="name" placeholder='Category Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={categoryStatus} onChange={(e)=>setCategoryStatus(e.target.value)}>
                                    <option value='active'>active</option>
                                    <option value='inactive'>inactive</option>
                                </select>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={applyCategoryChanges}>
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

export default AdminCategoryItem