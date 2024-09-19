import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeApiData } from '../../../../api/api'
import Loader from '../../../../services/Loader';

const SignUpItem = () => {
    const [loader, setLoader] = useState(false);

    const [tokenData, setTokenData] = useState('')
    const [userData, setUserData] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('job seeker')

    const [registerResponse, setRegisterResponse] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')

    const registerHandler = () => {
        setLoader(true)
        const validation = () => {
            if (name === '' || email === '' || password === '' || confirmPassword === '') {
                setLoader(false)
                setPasswordMsg("All field must be filled first!")
                return;
            }

            if (password !== confirmPassword) {
                setLoader(false)
                setPasswordMsg("Password and confirm password are not same")
                return;
            }

            register()
        }

        const register = async () => {
            await storeApiData(`auth/register`, {name, email, password, confirmPassword, role})
            .then((response) => {setRegisterResponse(response); console.log(response); console.log(registerResponse)})
            .catch((response) => {console.log(response)})
        }

        setRegisterResponse('')
        setEmailMsg('')
        setPasswordMsg('')
        validation()
    }

    useEffect(() => {
        proccessData()
    }, [registerResponse])

    const proccessData = () => {
        const moreValidation = () => {
            if (registerResponse === 'Email taken') {
                setLoader(false)
                setEmailMsg('Email already been taken')
                return;
            }
            else if (registerResponse === 'Name between') {
                setLoader(false)
                setEmailMsg('Name must be up to 2 until 100 characters')
                return;
            }
            else if (registerResponse === 'Password min') {
                setLoader(false)
                setPasswordMsg('Password must be at least 6 character')
                return;
            }

            fillUserData()
        }

        const fillUserData = () => {
            setUserData(registerResponse.data?.user)
            setTokenData(registerResponse.data?.token)

            if (registerResponse.data?.token) {
                localStorage.setItem('token', registerResponse.data?.token)
            }
            localStorage.setItem('role', role)
        }

        moreValidation()
    }

    useEffect(() => {
        directUser()
    }, [userData])

    const directUser = () => {
        if (userData?.verify === 0) {
            localStorage.setItem('slug', userData.slug);
            window.location = '/verify';
            return;
        }
        
        if (userData?.role === 'company') {
            window.location = `/company/${userData.slug}`
        }else if (userData?.role === 'job seeker') {
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
                                <label htmlFor="username">Username: </label>
                                <input type="text" className='form-control' name="name" placeholder='Username' value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <p className='auth-error email-msg'>{emailMsg}</p>
                            <div className='form-row'>
                                <label htmlFor="password">Password: </label>
                                <input type="password" className='form-control' name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="confirm_password">Confirm Password: </label>
                                <input type="password" className='form-control' name="confirm_password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <p className='auth-error password-msg'>{passwordMsg}</p>
                            <div className='form-row-radio'>
                                <h3>Who you are?</h3>
                                <div className="form-row">
                                    <input type="radio" className='radio' value='job seeker' checked={role === 'job seeker'} onChange={(e) => setRole(e.target.value)}/>
                                    <label htmlFor="role">Job Seeker</label>
                                </div>
                                <div className="form-row">
                                    <input type="radio" className='radio' value='company' checked={role === 'company'} onChange={(e) => setRole(e.target.value)}/>
                                    <label htmlFor="role">Company</label>
                                </div>
                            </div>
                            <button className="button" type='button' onClick={registerHandler}>
                                <div>
                                    <span>Sign Up</span>
                                </div>
                            </button>
                            <div className="forgot">
                                <Link to='/login'>already have an account?</Link>
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

export default SignUpItem