import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import github from '../../../../assets/images/github.svg'
import google from '../../../../assets/images/google.svg'
import { storeApiData } from '../../../../api/api'
import axios from 'axios'
import Loader from '../../../../services/Loader'
import ReCAPTCHA from 'react-google-recaptcha'

const LoginItem = () => {
    const [loader, setLoader] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenData, setTokenData] = useState('')
    const [userData, setUserData] = useState('')
    const [loginResponse, setLoginResponse] = useState('')

    // const [loginMsg, setLoginMsg] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')
    const [captchaMsg, setCaptchaMsg] = useState('')

    const [captchaStatus, setCaptchaStatus] = useState(false)

    const captchaChange = () => {
        // console.log('Changed')
        setCaptchaStatus(true)
    }

    const loginHandler = () => {
        setLoader(true)
        const validation = () => {
            if (email === '' || password === '') {
                setPasswordMsg('All field must be filled first!')
                setCaptchaStatus(false)
                setLoader(false)
                return;
            }

            if (!captchaStatus) {
                setCaptchaMsg('Please verify that you are not a robot!')
                setCaptchaStatus(false)
                setLoader(false)
                return;
            }

            getTokenByInput()
        }

        const getTokenByInput = async () => {
            await storeApiData(`auth/login`, { email, password })
            .then((response) => { setLoginResponse(response) })
            .catch((response) => { console.log(response) })
        }

        setLoginResponse('')
        setEmailMsg('')
        setPasswordMsg('')
        validation()
    }

    useEffect(() => {
        proccessData()
    }, [loginResponse])

    const proccessData = () => {
        const moreValidation = () => {
            if (loginResponse === 'Invalid email') {
                setCaptchaStatus(false)
                setLoader(false)
                setEmailMsg('Invalid email address')
                return;
            }
            else if (loginResponse === 'Password min') {
                setCaptchaStatus(false)
                setLoader(false)
                setPasswordMsg('Password must be at least 6 digit')
                return;
            }
            else if (loginResponse === 'Unauthorized') {
                setCaptchaStatus(false)
                setLoader(false)
                setPasswordMsg('Incorrect password')
                return;
            }

            if (loginResponse.data?.token) {
                localStorage.setItem('token', loginResponse.data?.token)
                setTokenData(loginResponse.data?.token)
            }

            if (localStorage.getItem('token')) {
                getUserByToken()
            }
        }

        const getUserByToken = async () => {
            await axios.get('http://localhost:8000/auth/user-profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then((response) => { setUserData(response.data.data) })
            .catch((response) => { console.log(response.data) })
        }

        moreValidation()
    }

    useEffect(() => {
        if (userData) {
            directUser()
        }
    }, [userData])

    const directUser = () => {
        localStorage.setItem('role', userData.role)
        let role = userData.role

        if (role === 'admin') {
            window.location = `/admin/${userData.slug}`
        }else if (role === 'company') {
            window.location = `/company/${userData.slug}`
        }else if (role === 'job seeker') {
            window.location = `/user/${userData.slug}`
        }
    }

    // const loginHandler = () => {
    //     const validation = () => {
    //         if (email === '' || password === '') {
    //             setLoginMsg('All field must be filled first!')
    //             return;
    //         }

    //         chainLoginCall()
    //     }

    //     function mockAPICall(id) {
    //         return new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 resolve(`Response from API with ID ${id}`);
    //             }, 1000); // Simulate delay of 1 second
    //         });
    //     }

    //     const getToken = async () => {
    //         await storeApiData(`auth/login`, { email, password })
    //         .then((response)=>{localStorage.setItem('token', response.data.token); setTokenData(response.data.token)})
    //         .catch((response)=>console.log(response.data))
    //     }

    //     const checkProfile = async () => {
    //         await axios.get('http://localhost:8000/auth/user-profile', {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`, 
    //             //   Authorization: `Bearer ${tokenData.token}`, 
    //             },
    //         }).then((response)=>setUserData(response.data.data))
    //         .catch((response)=>console.log(response.data))
    //     }

    //     const chainLoginCall = () => {
    //         mockAPICall(1)
    //         .then(response1 => {
    //             return getToken()
    //         })
    //         .then(response2 => {
    //             return checkProfile()
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    //     }

    //     // localStorage.clear()

    //     // chainLoginCall()
    //     setLoginMsg('')
    //     validation()
    // }

    // const checkRole = () => {
    //     let rolee = userData.role

    //     if (rolee === 'admin') {
    //         window.location = `/admin/${userData.slug}`
    //     }else if (rolee === 'company') {
    //         window.location = `/company/${userData.slug}`
    //     }else if (rolee === 'job seeker') {
    //         window.location = `/user/${userData.slug}`
    //     }
    // }

    // // Change Page
    // useEffect(() => {
    //     localStorage.setItem('role', userData.role)
    //     checkRole()
    //     console.log(userData)
    // }, [userData])
    // const [loader, setLoader] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoader(false);
    //     }, 300)
    // }, []);

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
        <section className='login'>
            <div className="container">
                <div className="auth-div">
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='name@domain.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <p className='auth-error'>{emailMsg}</p>
                            <div className='form-row'>
                                <label htmlFor="password">Password: </label>
                                <input type="password" className='form-control' name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <p className='auth-error'>{passwordMsg}</p>
                            <ReCAPTCHA
                                sitekey='6LcEOzsqAAAAAJsKqMe7Dj2cki4USMr5tbQlhKA3'
                                onChange={captchaChange}
                                className='captcha'
                            />
                            <p className='auth-captcha-error'>{captchaMsg}</p>
                            <button type='button' className="button" onClick={loginHandler}>
                                <div>
                                    {/* <img src='' alt='' height='15px' width='15px'/> */}
                                    <span>Login</span>
                                </div>
                            </button>
                            <div className="forgot">
                                <Link to='/sign-up'>Don't have any account?</Link>
                                <Link to='/forgot-password'>Forgot your password?</Link>
                            </div>
                            {/* <div className="social">
                                <img src={github} alt="github logo" />
                                <img src={google} alt="google logo" />
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </section>
            )}
        </>
    )
}

export default LoginItem