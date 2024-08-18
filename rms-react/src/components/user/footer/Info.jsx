import React from 'react';
import logo from '../../../assets/images/logo.svg';

const Info = () => {
    return (
        <div className="footer__section__container__footer__info">
            <img src={logo} alt="logo" />
            <p>
                Experience a streamlined recruitment process that brings together the best talent and the best employers in one place.
            </p>
        </div>
    );
};

export default Info;