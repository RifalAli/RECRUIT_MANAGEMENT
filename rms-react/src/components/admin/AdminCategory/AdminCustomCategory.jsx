import React, { useEffect, useState } from "react";
import sampleIcon from '../../../assets/images/default.png'
import AdminCategoryItem from "./AdminCategoryItem";
import { fetchApiData, storeApiData } from "../../../api/api";

const openModal = () => {
    let modal = document.getElementsByClassName('modal-category')[0];
    modal.style.display = 'block';
}

const AdminCustomCategory = () => {
    const closeModal = () => {
        let modal = document.getElementsByClassName('modal-category')[0];
        modal.style.display = 'none';
        setCategoryName('')
        setCategoryStatus('active')
    }

    const [categoryStatus, setCategoryStatus] = useState('active')
    const [categoryName, setCategoryName] = useState('')
    
    const [fetchState, setFetchState] = useState(true);
    const [categoryData, setCategoryData] = useState([]);

    const fetchCategory = async () => {
        const response = await fetchApiData(`loadCategory`)
        setCategoryData(response.data.category)
    }

    useEffect(() => {
        setFetchState(false);
        fetchCategory()
        // console.log(categoryData)
    }, [fetchState])

    const postCategory = () => {
        const createCateg = async () => {
            await storeApiData(`adminCreateCategory`, { categoryName, categoryStatus })
            .then((response)=>console.log(response.data))
            .catch((response)=>console.log(response.data))
        }

        createCateg()
        closeModal()
    }

    return (
        <section className="admin">
            <div className="container">
                <div className='category-div'>
                    <div className="info">
                    <h1>Category</h1>
                    <div className='button-div'>
                        <button type='button' onClick={openModal} className="button">
                            <div>
                                {/* <img src='' alt='' height='15px' width='15px'/> */}
                                <span>Add Category</span>
                            </div>
                        </button>
                    </div>
                    </div>
                    <div className="category__wrapper">
                        {/* <AdminCategoryItem index={0} />
                        <AdminCategoryItem index={1} />
                        <AdminCategoryItem index={2} /> */}
                        {
                            categoryData.map((item, i) => (
                                <AdminCategoryItem key={i} index={i} id={item.id} name={item.name} slug={item.slug} icon={item.icon} status={item.status} job_count={item.job_count}/>
                            ))
                        }
                    </div>
                    {/*  */}
                </div>
            </div>

            <div className="modal modal-category">
                <div className="modal-container">
                   <div className="photo">
                        <img src={sampleIcon} alt="sample" />
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
                                        {/* <img src='' alt='' height='15px' width='15px'/> */}
                                        <span>Create Category</span>
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

export default AdminCustomCategory