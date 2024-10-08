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
    const [successMsg, setSuccessMsg] = useState('');
    const [response, setReponse] = useState('')

    const submitEmailHandler = () => {
        setLoader(true)
        setErrMsg('')
        const validation = () => {
            if (email == '') {
                setLoader(false)
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
                setLoader(false)
                setErrMsg('Invalid Email')
            }else if (response.message == 'Link sent') {
                setLoader(false)
                setSuccessMsg('Success send reset password link to your email')
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
                                            <input type="email" className='form-control' name="email" placeholder='name@domain.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        </div>
                                        <p className='auth-error' style={{ margin: '3px 0 -20px 5px' }}>{errMsg}</p>
                                        <p className='auth-success' style={{ margin: '3px 0 -20px 5px' }}>{successMsg}</p>
                                        <button type='button' className="button" onClick={submitEmailHandler}>
                                            <div>
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