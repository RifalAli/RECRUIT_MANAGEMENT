import React, { useEffect, useState } from 'react';
import Header from './header/Header'
import Category from './categories/Category'
import FeaturedJob from './featured-jobs/FeaturedJob'
import Jobs from './jobs/Jobs'
import Footer from './footer/Footer'
import { fetchApiData, storeApiData } from '../../api/api';
import Loader from '../../services/Loader';
import axios from 'axios';

 const Main = () => {
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState([]);

    const [user, setUser] = useState([]);

    useEffect(() => {
        const checkUser = () => {
            if (user !== 'no') {
                const formData = new FormData();
                formData.append('user_id', user.id);

                fetchData(formData)
            }else {
                fetchData(null)
            }
        }
        const fetchData = async (formData) => {
            const response = await storeApiData(`homepage`, formData);
            if (response.data) {
                setData(response.data)
            }
        }
        checkUser()
    }, [user])

    useEffect(() => {
        const getUser = async () => {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.get('http://localhost:8000/auth/user-profile', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, 
                        },
                    });
                    setUser(response?.data.data);
                } catch (error) {
                    console.log(error.response?.data);
                }
            }else {
                setUser('none')
            }
        }
        getUser();
        setTimeout(() => {
            setLoader(false)
        }, 4000)
    }, [])

    // console.log(user.id)

    useEffect(() => {
        setTimeout(() => {
            // const fetchData = async() => {
            //     const response = await fetchApiData('home');
            //     if (response && response.status && response.status === true) {
            //         setData(response.data);
            //     }else {
            //         console.log(response);
            //     }
            //     setLoader(false);
            // };
            // fetchData();
        }, 300);
    }, []);
    return (
      <>
        {loader ? (
            <Loader />
        ) : (
            <>
                <Header cmp="home" />
                <Category categories={data.categories}/>
                {
                    data.featured_job && data.featured_job === 'Nothing' ? (
                        <></>
                    ) : (
                        <FeaturedJob featured={data.featured_job} similar='featured'/>
                    )
                }
                {/* <Jobs latest={data.latest}/> */}
                <Footer/>
            </>
        )}
      </>
    )
 };

 export default Main;