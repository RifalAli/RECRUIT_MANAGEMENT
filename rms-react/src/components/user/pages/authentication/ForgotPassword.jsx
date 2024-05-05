import React, { useEffect, useState } from 'react'
import NavBar from '../navigation/NavBar'
import Footer from '../../footer/Footer'
import { Link } from 'react-router-dom'
import Loader from '../../../../services/Loader'

const ForgotPassword = () => {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 300)
    }, []);
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <NavBar hero='Forgot Password' cmp='auth'/>
                    <section className='login'>
                        <div className="container">
                            <div className="auth-div">
                                <form>
                                    <div className="form">
                                        <div>
                                            <input type="email" className='form-control' name="email" placeholder='user email'/>
                                        </div>
                                        <button className="button">
                                            <div>
                                                {/* <img src='' alt='' height='15px' width='15px'/> */}
                                                <span>Submit</span>
                                            </div>
                                        </button>
                                       <div className="forgot">
                                            <Link to='/login'>Login form here</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                    <Footer/>
                </>
            )}
            
        </>
    )
}

export default ForgotPassword