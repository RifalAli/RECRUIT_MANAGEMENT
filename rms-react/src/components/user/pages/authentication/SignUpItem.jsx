import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeApiData } from '../../../../api/api'

const SignUpItem = () => {
    const [tokenData, setTokenData] = useState('')
    const [userData, setUserData] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('job seeker')

    const registerHandler = () => {
        function mockAPICall(id) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(`Response from API with ID ${id}`);
                }, 1000); // Simulate delay of 1 second
            });
        }
        
        const register = async () => {
            await storeApiData(`auth/register`, {name, email, password, confirmPassword, role})
            .then((response)=>{localStorage.setItem('token', response.data.token); setTokenData(response.data.token); setUserData(response.data.user);})
            .then(localStorage.setItem('role', role))
            .catch((response)=>console.log(response.data))
        }

        const chainRegisterCall = () => {
            mockAPICall(1)
            .then(response1 => {
                if (password !== confirmPassword) {
                    alert('password and confirm password not same')
                    return
                }
            })
            .then(response2 => {
                return register()
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        // localStorage.clear()

        chainRegisterCall()
    }

    const checkRole = async () => {
        if (userData.role === 'company') {
            window.location = `/company/${userData.slug}`
        }else if (userData.role === 'job seeker') {
            window.location = `/user/${userData.slug}`
        }
    }

    //change page
    useEffect(() => {
        checkRole()
    }, [userData])

    // useEffect(() => {
    //     console.log(name);
    //     console.log(email);
    //     console.log(password);
    //     console.log(confirmPassword);
    //     console.log(role);
    // }, [name, email, password, confirmPassword, role])
    return (
        <section className='login'>
            <div className="container">
                <div className="auth-div">
                    <form>
                        <div className="form">
                            <div className='form-row'>
                                <label htmlFor="username">Username: </label>
                                <input type="text" className='form-control' name="name" placeholder='username' value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="email">Email: </label>
                                <input type="email" className='form-control' name="email" placeholder='user email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="password">Password: </label>
                                <input type="password" className='form-control' name="password" placeholder='user password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="confirm_password">Confirm Password: </label>
                                <input type="password" className='form-control' name="confirm_password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className='form-row-radio'>
                                <h3>Who you are?</h3>
                                <div className="form-row">
                                    <input type="radio" value='job seeker' checked={role === 'job seeker'} onChange={(e) => setRole(e.target.value)}/>
                                    <label htmlFor="role">Job Seeker</label>
                                </div>
                                <div className="form-row">
                                    <input type="radio" value='company' checked={role === 'company'} onChange={(e) => setRole(e.target.value)}/>
                                    <label htmlFor="role">Company</label>
                                </div>
                                {/* <label htmlFor="role"> */}
                                {/* </label> */}
                                {/* <label htmlFor="role"> */}
                                {/* </label> */}
                            </div>
                            <button className="button" type='button' onClick={registerHandler}>
                                <div>
                                    {/* <img src='' alt='' height='15px' width='15px'/> */}
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
    )
}

export default SignUpItem