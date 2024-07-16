import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import github from '../../../../assets/images/github.svg'
import google from '../../../../assets/images/google.svg'
import { storeApiData } from '../../../../api/api'
import axios from 'axios'

const LoginItem = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenData, setTokenData] = useState('')
    const [userData, setUserData] = useState('')

    const loginHandler = () => {
        function mockAPICall(id) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(`Response from API with ID ${id}`);
                }, 1000); // Simulate delay of 1 second
            });
        }

        const getToken = async () => {
            await storeApiData(`auth/login`, { email, password })
            .then((response)=>{localStorage.setItem('token', response.data.token); setTokenData(response.data.token)})
            .catch((response)=>console.log(response.data))
        }

        const checkProfile = async () => {
            await axios.get('http://localhost:8000/auth/user-profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                //   Authorization: `Bearer ${tokenData.token}`, 
                },
            }).then((response)=>setUserData(response.data.data))
            .catch((response)=>console.log(response.data))
        }

        const chainLoginCall = () => {
            mockAPICall(1)
            .then(response1 => {
                return getToken()
            })
            .then(response2 => {
                return checkProfile()
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        // localStorage.clear()

        chainLoginCall()
    }

    const checkRole = () => {
        let rolee = userData.role

        if (rolee === 'admin') {
            window.location = `/admin/${userData.slug}`
        }else if (rolee === 'company') {
            window.location = `/company/${userData.slug}`
        }else if (rolee === 'job seeker') {
            window.location = `/user/${userData.slug}`
        }
    }

    // Change Page
    useEffect(() => {
        localStorage.setItem('role', userData.role)
        checkRole()
    }, [userData])
    return (
        <section className='login'>
            <div className="container">
                <div className="auth-div">
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='user email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="password">Password: </label>
                                <input type="password" className='form-control' name="password" placeholder='user password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
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
                            <div className="social">
                                <img src={github} alt="github logo" />
                                <img src={google} alt="google logo" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginItem