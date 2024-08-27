import React, { useEffect, useState } from 'react'
import NavBar from '../navigation/NavBar'
import Footer from '../../footer/Footer'
import { Link } from 'react-router-dom'
import Loader from '../../../../services/Loader'
import axios from 'axios'
import OTPInput from 'react-otp-input'
import { storeApiData } from '../../../../api/api'

const OTPAuth = () => {
    const [loader, setLoader] = useState(true);

    const [user, setUser] = useState('')
    const [otp, setOtp] = useState('')

    const [msg, setMsg] = useState('-')

    const checkProfile = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/user-profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            });
            setUser(response.data.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const checkVerify = () => {
        // if (user === 'Invalid') {
        //     // console.log("OTP Is Invalid")
        //     setMsg('Invalid OTP, consider check back your email')
        // }else {
        //     setMsg('')
        //     setTimeout(() => {
        //         window.location.reload()
        //     }, 1500)
        // }
        if (user === 'Invalid') {
            setMsg('Invalid OTP, consider check back your email')
            toggleError('visible')
        }else {
            if (user?.verify === 1 || user?.verify === true) {
                const role = localStorage.getItem('role')
                const slug = localStorage.getItem('slug')
                let realRole = null
    
                if (role == 'job seeker') {
                    realRole = 'user'
                }else if (role == 'company') {
                    realRole = 'company'
                }
    
                window.location = `/${realRole}/${slug}`
            }
        }
        // if (user?.verify === 1) {
        //     const role = localStorage.getItem('role')
        //     const slug = localStorage.getItem('slug')
        //     let realRole = null

        //     if (role == 'job seeker') {
        //         realRole = 'user'
        //     }

        //     window.location = `/${realRole}/${slug}`
        // }else {
        //     if (user === 'Invalid') {
        //         setMsg('Invalid OTP, consider check back your email')
        //     }
        // }
    }

    const toggleError = (state) => {
        let errMsg = document.getElementsByClassName('otp-error-msg')[0];
        if (errMsg) {
            errMsg.style.visibility = state;
        }
    }

    const submitOTP = async () => {
        setMsg('-')
        toggleError('hidden')
        setUser('')
        let slug = localStorage.getItem('slug');
        let role = localStorage.getItem('role');
        await storeApiData(`auth/verify-otp`, { slug, otp, role })
            .then((response)=>{setUser(response.data); console.log(response.data)})
            .catch((response)=>console.log(response.data))
    }

    const resendOTP = async () => {
        let slug = localStorage.getItem('slug');
        let role = localStorage.getItem('role');
        await storeApiData(`auth/send-otp`, { slug, role })
            .then((response)=>{console.log(response.data)})
            .catch((response)=>console.log(response.data))
    }

    useEffect(() => {
        if (!user) {
            checkProfile()
            toggleError('hidden')
        }
    }, [])

    useEffect(() => {
        checkVerify()
    }, [user])

    useEffect(() => {
        setTimeout(() => {
            toggleError('hidden')
            setLoader(false);
        }, 300)
    }, []);
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <NavBar hero='OTP Auth' cmp='auth'/>
                    <section className='login'>
                        <div className="container">
                            <div className="auth-div">
                                <form>
                                    <div className="form">
                                        <h1>Please input OTP that already sent to your email</h1>
                                        {/* <div>
                                            <input type="email" className='form-control' name="email" placeholder='user email'/>
                                        </div>
                                        <button className="button">
                                            <div>
                                                <img src='' alt='' height='15px' width='15px'/>
                                                <span>Submit</span>
                                            </div>
                                        </button>
                                       <div className="forgot">
                                            <Link to='/login'>Login form here</Link>
                                        </div> */}
                                        <br />
                                        <OTPInput
                                        
                                            value={otp}
                                            skipDefaultStyles={true}
                                            onChange={setOtp}
                                            numInputs={6}
                                            inputStyle={'otp-input'}
                                            renderSeparator={<span>&nbsp;</span>}
                                            renderInput={(props) => <input {...props} />}
                                        />

                                        <br />
                                        <p className='otp-error-msg'>{msg}</p>

                                        <p className='otp-quest-msg'>Didn't receive OTP mail yet? <span className='otp-resend' onClick={resendOTP}>Resend OTP</span></p>

                                        {/* <p>{msg}</p> */}

                                        <button type='button' className="button otp-submit" onClick={submitOTP}>
                                            <div>
                                                <span>Submit</span>
                                            </div>
                                        </button>
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

export default OTPAuth