import React from 'react'

const ContactForm = () => {
    return (
        <section className='contact'>
            <div className="container">
                <div className="contact_div">
                    <form>
                        <div className="contact-form">
                            <div className="row1">
                                <input type='text' className='form-control' name='name' placeholder='name'/>
                                <input type='email' className='form-control' name='email' placeholder='email'/>
                            </div>
                            <div className="row2">
                                <input type='text' className='form-control' name='subject' placeholder='subject'/>
                            </div>
                            <div className="row3">
                                <textarea name='message' rows='10' />
                            </div>
                            <button className='button' >Send Message</button>
                        </div>
                    </form>
                    <div className="contact_address">
                        <div className="row">
                            <i className='fa fa-map-marker'></i>
                            <div className="info">
                                <p>no 23, basudara, Dama</p>
                                <p>Customer Center: 2345234 street name - city, country</p>
                            </div>
                        </div>
                        <div className="row">
                            <i className='fa fa-envelope'></i>
                            <div className="info">
                                <p>no 23, basudara, Dama</p>
                                <p>Customer Center: 2345234 street name - city, country</p>
                            </div>
                        </div>
                        <div className="row">
                            <i className='fa fa-volume-control-phone'></i>
                            <div className="info">
                                <p>no 23, basudara, Dama</p>
                                <p>Customer Center: 2345234 street name - city, country</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm