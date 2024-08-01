import React from 'react'
import Search from '../../header/Search'
import defaultImg from '../../../../assets/images/default.png'

const NavHero = ({ hero, job }) => {
    console.log(job);
    return (
        <div className='hero_section'>
            <>
                {
                    hero === 'jobs' || hero === 'search' ? (
                        <>
                            <div className='title'>
                                <h1>Find Job</h1>
                            </div>
                            {/* <div className='search_nav'>
                                <Search />    
                            </div> */}
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
                                                <div className="country">
                                                    <i className="fa fa-map-marker"></i>
                                                    <span>{job.company[0].name}</span>
                                                </div>
                                                <div className="date">
                                                    <i className="fa fa-calendar"></i>
                                                    <span>Posted: {new Date(job.created_at).toISOString().slice(0, 10)}</span>
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