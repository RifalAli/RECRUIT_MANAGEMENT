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
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenData, setTokenData] = useState('')
    const [userData, setUserData] = useState('')
    const [loginResponse, setLoginResponse] = useState('')

    const [emailMsg, setEmailMsg] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')
    const [captchaMsg, setCaptchaMsg] = useState('')

    const [captchaStatus, setCaptchaStatus] = useState(false)

    const captchaChange = () => {
        setCaptchaStatus(true)
    }

    const loginHandler = () => {
        setCaptchaMsg('')
        setLoader(true)
        const validation = () => {
            if (email === '' || password === '') {
                setCaptchaMsg('All field must be filled first!')
                setCaptchaStatus(false)
                setLoader(false)
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                setLoader(false)
                setEmailMsg("Invalid email format")
                return;
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&(){};,.]).{6,}$/;

            if (!passwordRegex.test(password)) {
              setLoader(false);
              setPasswordMsg(
                "Password must contain uppercase, lowercase, number, symbol, and be at least 6 characters long"
              );
              return;
            }

            if (!captchaStatus) {
                setCaptchaMsg('Please verify that you are not a robot!')
                setCaptchaStatus(false)
                setLoader(false)
                return;
            }

            // return;

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
            else if (loginResponse === 'Banned') {
                setCaptchaStatus(false)
                setLoader(false)
                setPasswordMsg('Cannot login because your account has been banned')
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
                                <input type={showPassword ? "text" : "password"} className='form-control' name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <button style={{ position: "relative", left: "70%", width: "30%" }} type='button' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide Password" : "Show Password"}
                            </button>
                            <p className='auth-error' style={{ marginTop: "5px" }}>{passwordMsg}</p>
                            <ReCAPTCHA
                                sitekey='6LcEOzsqAAAAAJsKqMe7Dj2cki4USMr5tbQlhKA3'
                                onChange={captchaChange}
                                className='captcha'
                            />
                            <p className='auth-captcha-error'>{captchaMsg}</p>
                            <button type='button' className="button" onClick={loginHandler}>
                                <div>
                                    <span>Login</span>
                                </div>
                            </button>
                            <div className="forgot">
                                <Link to='/sign-up'>Don't have any account?</Link>
                                <Link to='/forgot-password'>Forgot your password?</Link>
                            </div>
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