import React, { useEffect, useState } from "react";
import sampleIcon from '../../../assets/images/default.png'
import AdminCategoryItem from "./AdminCategoryItem";
import { fetchApiData, storeApiData } from "../../../api/api";
import Loader from "../../../services/Loader"

const openModal = () => {
    let modal = document.getElementsByClassName('modal-category')[0];
    modal.style.display = 'block';
}

const AdminCustomCategory = () => {
    const [loader, setLoader] = useState(true)
    const [doRefresh, setDoRefresh] = useState(false)

    const closeModal = () => {
        let modal = document.getElementsByClassName('modal-category')[0];
        modal.style.display = 'none';
        setCategoryName('')
        setCategoryStatus('active')
    }

    const [categoryStatus, setCategoryStatus] = useState('active')
    const [categoryName, setCategoryName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const [image, setImage] = useState(null)
    
    const [fetchState, setFetchState] = useState(true);
    const [categoryData, setCategoryData] = useState([]);

    const fetchCategory = async () => {
        const response = await fetchApiData(`loadCategory`)
        setCategoryData(response.data.category)
    }

    useEffect(() => {
        setFetchState(false);
        fetchCategory()
        setTimeout(() => {
            setLoader(false);
        }, 4000);
    }, [fetchState])

    const postCategory = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('categoryName', categoryName)
        formData.append('categoryStatus', categoryStatus)
        formData.append('image', image)

        const createCateg = async () => {
            await storeApiData(`adminCreateCategory`, formData)
            .then((response)=>console.log(response.data))
            .then(setDoRefresh(!doRefresh))
            .catch((response)=>console.log(response.data))
        }

        createCateg()
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
                <div className='category-div'>
                    <div className="info">
                    <h1>Category</h1>
                    <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                <span>Add Category</span>
                            </div>
                        </button>
                    </div>
                    </div>
                    <div className="category__wrapper">
                        {
                            categoryData.map((item, i) => (
                                <AdminCategoryItem key={i} index={i} id={item.id} name={item.name} slug={item.slug} icon={item.icon} status={item.status} job_count={item.job_count}/>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="modal modal-category">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
                        <input type='file' onChange={(e) => setImage(e.target.files[0])} className='btn-image-change'></input>
                    </div>
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="name">Name: </label>
                                <input type="text" className='form-control' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} name="name" placeholder='Category Name'/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="status">Status: </label>
                                <select className='form-control' value={categoryStatus} onChange={(e)=>setCategoryStatus(e.target.value)}>
                                    <option value='active'>active</option>
                                    <option value='inactive'>inactive</option>
                                </select>
                            </div>
                            <div className='button-div'>
                                <button type='button' className="button" onClick={postCategory}>
                                    <div>
                                        <span>Create Category</span>
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

export default AdminCustomCategory