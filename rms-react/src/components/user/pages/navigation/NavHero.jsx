import React from 'react'
import Search from '../../header/Search'
import defaultImg from '../../../../assets/images/default.png'

const NavHero = ({ hero, job }) => {
    return (
        <div className='hero_section'>
            <>
                {
                    hero === 'jobs' || hero === 'search' ? (
                        <>
                            <div className='title'>
                                <h1>Find Job</h1>
                            </div>
                        </> 
                    ) : hero === 'contact' || 
                    hero === 'Login' || 
                    hero === 'Sign Up' || 
                    hero === 'Forgot Password' || 
                    hero === 'user profile' ? (
                    <h1 className='title'>{hero}</h1>
                    ) : (
                        job && (
                            <>
                                <div className="hero-data">
                                    <div className="left">
                                        <div className="icon">
                                            <img src={job.icon} alt="icon" />
                                        </div>
                                        <div className="details">
                                            <h1>{job.title}</h1>
                                            <div className="posted">
                                                <div className="company-name">
                                                    <i className="fa fa-map-marker"></i>
                                                    <span>   {job.company[0].name}</span>
                                                </div>
                                                <div className="company-location">
                                                    <i className="fa fa-map"></i>
                                                    <span>{job.company[0].location}</span>
                                                </div>
                                                <div className="company-name">
                                                    <i className="fa fa-tag"></i>
                                                    <span>{job.category.name}</span>
                                                </div>
                                                <div className="company-name">
                                                    <i className="fa fa-briefcase"></i>
                                                    <span style={{ textTransform: 'capitalize' }}>{job.type}</span>
                                                </div>
                                                <div className="post-date">
                                                    <i className="fa fa-calendar"></i>
                                                    <span>Posted: {new Date(job.created_at).toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' + new Date(job.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                <div className="expire-date">
                                                    <i className="fa fa-hourglass"></i>
                                                    <span>Expires: {new Date(job.expire_at).toLocaleDateString('en-GB').replace(/\//g, '-') + ' ' + new Date(job.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="amount">
                                            <h2>Monthly Salary</h2>
                                            <h2>{Number(job.salary).toLocaleString("id", {currency: "IDR", style: "currency"})}</h2>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    )
                }
            </>
        </div>
    )
}

export default NavHero