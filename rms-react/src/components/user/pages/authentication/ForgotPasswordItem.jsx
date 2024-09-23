import React, { useEffect, useState } from 'react'
import NavBar from '../navigation/NavBar'
import Footer from '../../footer/Footer'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../../../services/Loader'
import { storeApiData } from '../../../../api/api'

const ForgotPasswordItem = () => {
    const [loader, setLoader] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [updateRepsonse, setUpdateResponse] = useState('');
    let url = useParams()

    const { token, hashEmail } = url

    const submitHandler = () => {
        setLoader(true)
        const checkPassword = () => {
            setErrMsg('')
            console.log(password, confirmPassword)
            if (password == '' || confirmPassword == '') {
                setLoader(false)
                return setErrMsg('All field must be filled first')
            }
            
            // if (password.length < 6) {
            //     setLoader(false)
            //     return setErrMsg('Password must be at least 6 character')
            // }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&(){};,.]).{6,}$/;

            if (!passwordRegex.test(password)) {
              setLoader(false);
              setErrMsg(
                "Password must contain uppercase, lowercase, number, symbol, and be at least 6 characters long"
              );
              return;
            }
            
            if (password !== confirmPassword) {
                setLoader(false)
                return setErrMsg('Password and confirm password are not same')
            }

            const formData = new FormData();
            formData.append('email', hashEmail)
            formData.append('token', token)
            formData.append('password', password)

            requestChangePassword(formData)
        }

        const requestChangePassword = async (formData) => {
            await storeApiData(`/auth/update-password`, formData)
            .then((response) => { setUpdateResponse(response) })
            .catch((response) => { console.log(response) })
        }
        
        checkPassword()
    }

    useEffect(() => {
        const checkResponse = () => {
            if (updateRepsonse.message == 'Password Updated') {
                window.location = '/login';
            }else if (updateRepsonse.message == 'Invalid email address or token' || updateRepsonse.message == 'The payload is invalid.'){
                setLoader(false)
                setErrMsg('Failed to update password, try again later')
            }
        }
        checkResponse()
    }, [updateRepsonse])

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
                                            <input type={showPassword ? "text" : "password"} className='form-control' name="password" placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                            <input type={showPassword ? "text" : "password"} className='form-control' name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <button style={{ position: "relative", left: "70%", width: "30%" }} type='button' onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? "Hide Password" : "Show Password"}
                                        </button>
                                        <br />
                                        <p className='auth-error' style={{ margin: '-10px 0 -10px 0' }}>{errMsg}</p>
                                        <button type='button' className="button" onClick={submitHandler}>
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

export default ForgotPasswordItem