import React, { useEffect, useState } from 'react'
import NavBar from '../navigation/NavBar'
import Footer from '../../footer/Footer'
import { Link } from 'react-router-dom'
import Loader from '../../../../services/Loader'
import { storeApiData } from '../../../../api/api'

const ForgotPassword = () => {
    const [loader, setLoader] = useState(true);
    const [email, setEmail] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [response, setReponse] = useState('')

    const submitEmailHandler = () => {
        setErrMsg('')
        const validation = () => {
            if (email == '') {
                return setErrMsg('Email field must be filled first')
            }

            sendResetRequest()
        }
        const sendResetRequest = async () => {
            await storeApiData(`/auth/forgot-password`, { email })
            .then((response) => { setReponse(response) })
            .catch((response) => { console.log(response) })
        }
        setReponse('')
        validation()
    }

    useEffect(() => {
        const checkResponse = () => {
            if (response.message == 'Invalid email') {
                setErrMsg('Invalid Email')
            }
        }
        checkResponse()
    }, [response])

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
                                        <label htmlFor="email" style={{ margin: '0 0 -10px 0' }}>Email: </label>
                                        <div>
                                            <input type="email" className='form-control' name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <p className='auth-error' style={{ margin: '3px 0 -20px 5px' }}>{errMsg}</p>
                                        <button type='button' className="button" onClick={submitEmailHandler}>
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