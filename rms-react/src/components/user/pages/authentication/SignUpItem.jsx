import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeApiData } from '../../../../api/api'
import Loader from '../../../../services/Loader';

const SignUpItem = () => {
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [tokenData, setTokenData] = useState('')
    const [userData, setUserData] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('job seeker')

    const [nik, setNik] = useState('')
    const [telepon, setTelepon] = useState('')
    const [tglLahir, setTglLahir] = useState('')

    const forMinDate = new Date();
    const forMaxDate = new Date();

    const minDate = forMinDate.toISOString(forMinDate.setFullYear(forMinDate.getFullYear() - 60)).split('T')[0];
    const maxDate = forMaxDate.toISOString(forMaxDate.setFullYear(forMaxDate.getFullYear() - 15)).split('T')[0];

    const [registerResponse, setRegisterResponse] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')

    const registerHandler = () => {
        setLoader(true)
        const validation = () => {
            if (name === '' || email === '' || nik === '' || telepon === '' || tglLahir === '' || password === '' || confirmPassword === '') {
                setLoader(false)
                setPasswordMsg("All field must be filled first!")
                return;
            }

            if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                setLoader(false)
                setPasswordMsg("Field cannot only contain whitespace")
                return;
            }

            const nameRegex = /^[a-zA-Z\s]+$/;

            if (!nameRegex.test(name)) {
                setLoader(false);
                setPasswordMsg("Name cannot contain symbol")
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                setLoader(false)
                setPasswordMsg("Invalid email format")
                return;
            }

            const numberRegex = /^\d*$/;

            if (!numberRegex.test(nik) || nik.length !== 16) {
                setLoader(false)
                setPasswordMsg("NIK must be number and have 16 digits")
                return;
            }

            if (!numberRegex.test(telepon) || telepon.length !== 12) {
                setLoader(false)
                setPasswordMsg("Phone Number must be number and have 12 digits")
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

            if (password !== confirmPassword) {
                setLoader(false)
                setPasswordMsg("Password and confirm password are not same")
                return;
            }

            // stop before actual register for test
            // setLoader(false)
            // return;

            register()
        }

        const register = async () => {
            await storeApiData(`auth/register`, {name, email, password, confirmPassword, role, nik, telepon, tglLahir})
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
                            <div className='form-row'>
                                <label htmlFor="nik">NIK: </label>
                                <input type="tel" maxLength={16} className='form-control' name="nik" placeholder='NIK' value={nik} onChange={(e) => setNik(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="telepon">Phone Num: </label>
                                <input type="tel" maxLength={12} className='form-control' name="telepon" placeholder='081234567890' value={telepon} onChange={(e) => setTelepon(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="tgllahir">Birthdate: </label>
                                <input type="date" min={minDate} max={maxDate} className='form-control' name="tgllahir" value={tglLahir} onChange={(e) => setTglLahir(e.target.value)}/>
                            </div>
                            <p className='auth-error email-msg'>{emailMsg}</p>
                            <div className='form-row'>
                                <label htmlFor="password">Password: </label>
                                <input type={showPassword ? "text" : "password"} className='form-control' name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className='form-row'>
                                <label htmlFor="confirm_password">Confirm Password: </label>
                                <input type={showPassword ? "text" : "password"} className='form-control' name="confirm_password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                            <button style={{ position: "relative", left: "70%", width: "30%" }} type='button' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? "Hide Password" : "Show Password"}
                            </button>
                            <p className='auth-error password-msg' style={{ marginTop: "5px" }}>{passwordMsg}</p>
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